import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../../../services/client/client-service';
import { Client } from '../../../../model/client.model';
import { Modal } from '../../../../shared/modal/modal';
import { ClientForm } from '../client-form/client-form';
import { Toast } from '../../../../shared/toast/toast/toast';

@Component({
  selector: 'app-client-list-view',
  imports: [RouterLink, FormsModule, Modal, ClientForm, Toast],
  templateUrl: './client-list-view.html',
  styleUrl: './client-list-view.css',
})
export class ClientListView implements OnInit {
  private clientService = inject(ClientService);

  clientList = signal<Client[]>([]);
  searchTerm = signal<string>('');

  isClientModalOpen = signal(false);
  selectedClientId = signal<number | null>(null);

  toastOpen = signal(false);
  toastMessage = signal('');
  toastType = signal<'success' | 'error' | 'info'>('success');

  showToast(message: string, type: 'success' | 'error' | 'info') {
    this.toastMessage.set(message);
    this.toastType.set(type);
    this.toastOpen.set(true);
    setTimeout(() => this.toastOpen.set(false), 4000);
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
        closed: 'cerrado'
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
  }

  loadClients(): void {
    this.clientService.getClientList().subscribe({
      next: (data: any) => {
        this.clientList.set(data);
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete')
    });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  openCreateModal(): void {
    this.selectedClientId.set(null);
    this.isClientModalOpen.set(true);
  }

  openEditModal(id: number): void {
    this.selectedClientId.set(id);
    this.isClientModalOpen.set(true);
  }

  closeClientModal(): void {
    this.isClientModalOpen.set(false);
    this.selectedClientId.set(null);
  }

  handleClientSaved(): void {
    this.closeClientModal();
    this.showToast('El cliente se registró exitosamente', 'success');
    this.loadClients();
  }

  deleteClient(id: number, hard: boolean = false): void {
    this.clientService.deleteClient(id, hard).subscribe({
      next: () => {
        this.clientList.update((clients) =>
          clients.filter(client => client.id !== id)
        );
      },
      error: (error) => console.error(error)
    });
  }
}