import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../../../services/company/company-service';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { Company } from '../../../../model/company.model';
import { CompanyForm } from '../company-form/company-form';
import { Toast } from '../../../../shared/toast/toast';
import { Modal } from '../../../../shared/modal/modal';
import { CommonModule } from '@angular/common';
import { TableColumn } from '../../../../model/table-column.model';
import { DataTable } from '../../../../shared/data-table/data-table';
import { TableTemplateDirective } from '../../../../shared/data-table/table-template.directive';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-company-list-view',
  imports: [
    CommonModule,
    Modal,
    FormsModule,
    Toast,
    CompanyForm,
    DataTable,
    TableTemplateDirective,
    DatePipe,
  ],
  templateUrl: './company-list-view.html',
  styleUrl: './company-list-view.css',
})
export class CompanyListView implements OnInit, OnDestroy {
  private companyService = inject(CompanyService);

  companyList = signal<Company[]>([]);
  loadingCompanies = signal(false);
  searchTerm = signal<string>('');
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  companyColumns: TableColumn[] = [
    { key: 'name', label: 'Nombre' },
    { key: 'cuit', label: 'CUIT' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Teléfono' },
    { key: 'status', label: 'Estado' },
    { key: 'actions', label: 'Acciones', align: 'end' },
  ];

  isCompanyModalOpen = signal(false);
  selectedCompanyId = signal<number | null>(null);

  isDeleteModalOpen = signal(false);
  companyToDeleteId = signal<number | null>(null);

  isViewModalOpen = signal(false);
  selectedCompany = signal<Company | null>(null);

  toastOpen = signal(false);
  toastMessage = signal('');
  toastType = signal<'success' | 'error'>('success');

  showToast(message: string, type: 'success' | 'error') {
    this.toastMessage.set(message);
    this.toastType.set(type);
    this.toastOpen.set(true);
    setTimeout(() => this.toastOpen.set(false), 5000);
  }

  filteredCompanyList = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) {
      return this.companyList();
    }

    return this.companyList().filter((company) => {
      const name = company.name?.toLowerCase() || '';
      const cuit = company.cuit?.toLowerCase() || '';
      const email = company.email?.toLowerCase() || '';
      const phone = company.phone?.toLowerCase() || '';
      const status = company.enabled ? 'activa' : 'inactiva';
      return (
        name.includes(term) ||
        cuit.includes(term) ||
        email.includes(term) ||
        phone.includes(term) ||
        status.includes(term)
      );
    });
  });

  ngOnInit(): void {
    this.loadCompanies();
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

  loadCompanies(): void {
    this.loadingCompanies.set(true);
    this.companyService
      .getCompanyList()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Company[]) => {
          this.companyList.set(data);
          this.loadingCompanies.set(false);
        },
        error: (error) => {
          this.loadingCompanies.set(false);
          this.showToast(
            'No se pudo cargar la lista. Comuníquese con administración si el error persiste.',
            'error'
          );
        },
      });
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchSubject.next(input.value);
  }

  openNewCompany() {
    this.selectedCompanyId.set(null);
    this.isCompanyModalOpen.set(true);
  }

  closeCompanyModal() {
    this.isCompanyModalOpen.set(false);
    this.selectedCompanyId.set(null);
  }

  openEditCompany(company: Company): void {
    this.selectedCompanyId.set(company.id);
    this.isCompanyModalOpen.set(true);
  }

  openViewCompany(Company: Company): void {
    this.selectedCompany.set(Company);
    this.isViewModalOpen.set(true);
  }

  closeViewCompany() {
    this.isViewModalOpen.set(false);
    this.selectedCompany.set(null);
  }

  handleCompanySaved(): void {
    const wasEdited = this.selectedCompanyId() !== null;
    this.closeCompanyModal();
    this.showToast(
      wasEdited ? 'Empresa actualizada exitosamente' : 'Empresa creada exitosamente',
      'success'
    );
    this.loadCompanies();
  }

  confirmDeleteCompany(id: number) {
    this.companyToDeleteId.set(id);
    this.isDeleteModalOpen.set(true);
  }

  closeDeleteCompany() {
    this.isDeleteModalOpen.set(false);
    this.companyToDeleteId.set(null);
  }

  deleteCompany(): void {
    const id = this.companyToDeleteId();
    if (id === null) return;
    this.companyService
      .deleteCompany(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.companyList.update((companies) => companies.filter((company) => company.id !== id));
          this.showToast('Empresa eliminada exitosamente', 'success');
          this.closeDeleteCompany();
        },
        error: (error) => {
          this.showToast(
            'No se pudo eliminar la empresa. Comuníquese con administración si el error persiste.',
            'error'
          );
        },
      });
  }

  handleCompanyError(message: string): void {
    this.showToast(message, 'error');
  }
}
