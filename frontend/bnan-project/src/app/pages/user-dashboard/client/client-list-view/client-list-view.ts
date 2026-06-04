import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../../../services/client/client-service';
import { Client } from '../../../../model/client.model';
import { Modal } from '../../../../shared/modal/modal';
import { ClientForm } from '../client-form/client-form';
import { Toast } from '../../../../shared/toast/toast';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { TableColumn } from '../../../../model/table-column.model';
import { DataTable } from '../../../../shared/data-table/data-table';
import { TableTemplateDirective } from '../../../../shared/data-table/table-template.directive';
import { HasRoleDirective } from '../../../../shared/directives/has-role.directive';

@Component({
  selector: 'app-client-list-view',
  imports: [
    FormsModule,
    Modal,
    ClientForm,
    Toast,
    DataTable,
    TableTemplateDirective,
    HasRoleDirective,
  ],
  templateUrl: './client-list-view.html',
  styleUrl: './client-list-view.css',
})
export class ClientListView implements OnInit {
  private clientService = inject(ClientService);

  clientList = signal<Client[]>([]);
  loadingClients = signal(false);
  searchTerm = signal<string>('');
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  clientColumns: TableColumn[] = [
    { key: 'name', label: 'Nombre' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Teléfono' },
    { key: 'company_name', label: 'Empresa' },
    { key: 'status', label: 'Estado' },
    { key: 'actions', label: 'Acciones', align: 'end' },
  ];

  isClientModalOpen = signal(false);
  selectedClientId = signal<number | null>(null);

  isDeleteModalOpen = signal(false);
  isHardDelete = signal(false);
  clientToDeleteId = signal<number | null>(null);

  isViewModalOpen = signal(false);
  selectedClient = signal<Client | null>(null);

  toastOpen = signal(false);
  toastMessage = signal('');
  toastType = signal<'success' | 'error' | 'info'>('success');

  showToast(message: string, type: 'success' | 'error' | 'info') {
    this.toastMessage.set(message);
    this.toastType.set(type);
    this.toastOpen.set(true);
    setTimeout(() => this.toastOpen.set(false), 5000);
  }

  filteredClientList = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) {
      return this.clientList();
    }

    return this.clientList().filter((client) => {
      const name = client.name?.toLowerCase() || '';
      const email = client.email?.toLowerCase() || '';
      const company = client.company_name?.toLowerCase() || '';
      const responsible = client.responsible_name?.toLowerCase() || '';
      const statusMap: Record<string, string> = {
        active: 'activo',
        lead: 'lead',
        closed: 'cerrado',
      };
      const status = statusMap[client.status?.toLowerCase()] || '';

      return (
        name.includes(term) ||
        email.includes(term) ||
        company.includes(term) ||
        status.includes(term) ||
        responsible.includes(term)
      );
    });
  });

  ngOnInit(): void {
    this.loadClients();
    this.searchSubject
      .pipe(debounceTime(100), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((term: string) => {
        this.searchTerm.set(term);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadClients(): void {
    this.loadingClients.set(true);
    this.clientService
      .getClientList()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Client[]) => {
          this.clientList.set(data);
          this.loadingClients.set(false);
        },
        error: (error) => {
          this.loadingClients.set(false);
          this.showToast(
            'No se pudo cargar la lista. Comuníquese con administración si el error persiste.',
            'error'
          );
        },
      });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  openNewClient(): void {
    this.selectedClientId.set(null);
    this.isClientModalOpen.set(true);
  }

  closeClientModal(): void {
    this.isClientModalOpen.set(false);
    this.selectedClientId.set(null);
  }

  openEditClient(client: Client): void {
    this.selectedClientId.set(client.id);
    this.isClientModalOpen.set(true);
  }

  openViewClient(client: Client): void {
    this.selectedClient.set(client);
    this.isViewModalOpen.set(true);
  }

  closeViewClient() {
    this.isViewModalOpen.set(false);
    this.selectedClient.set(null);
  }

  handleClientSaved(): void {
    const wasEdited = this.selectedClientId() !== null;
    this.closeClientModal();
    this.showToast(
      wasEdited ? 'El cliente se actualizó exitosamente' : 'El cliente se registró exitosamente',
      'success'
    );
    this.loadClients();
  }

  confirmDeleteClient(id: number, hardDelete: boolean) {
    this.clientToDeleteId.set(id);
    this.isHardDelete.set(hardDelete);
    this.isDeleteModalOpen.set(true);
  }

  closeDeleteClient() {
    this.isDeleteModalOpen.set(false);
    this.clientToDeleteId.set(null);
  }

  deleteClient(): void {
    const id = this.clientToDeleteId();
    if (id === null) return;
    this.clientService
      .deleteClient(id, this.isHardDelete())
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.clientList.update((clients) => clients.filter((client) => client.id !== id));
          this.showToast('Cliente eliminado exitosamente', 'success');
          this.closeDeleteClient();
        },
        error: (error) => {
          this.showToast('Error al eliminar cliente' + error.error.message, 'error');
        },
      });
  }

  handleClientError(message: string): void {
    this.showToast(message, 'error');
  }
}