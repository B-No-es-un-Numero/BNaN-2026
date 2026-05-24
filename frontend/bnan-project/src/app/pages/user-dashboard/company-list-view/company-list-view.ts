import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CompanyService } from '../../../services/company-service';

@Component({
  selector: 'app-company-list-view',
  imports: [RouterLink, FormsModule],
  templateUrl: './company-list-view.html',
  styleUrl: './company-list-view.css',
})
export class CompanyListView implements OnInit {

  private companyService = inject(CompanyService);

  companyList = signal<any[]>([]);
  searchTerm = signal<string>('');

  filteredCompanyList = computed(() => {

    const term = this.searchTerm().toLowerCase().trim();

    if (!term) {
      return this.companyList();
    }

    return this.companyList().filter((company) => {

      const name = company.name?.toLowerCase() || '';
      const cuil = company.cuil?.toLowerCase() || '';
      const email = company.email?.toLowerCase() || '';
      const phone = company.phone?.toLowerCase() || '';

      const status = company.enabled
        ? 'activa'
        : 'inactiva';

      return (
        name.includes(term) ||
        cuil.includes(term) ||
        email.includes(term) ||
        phone.includes(term) ||
        status.includes(term)
      );
    });

  });

  ngOnInit(): void {
    this.companyService.getCompanyList().subscribe({
      next: (data: any) => {
        this.companyList.set(data);
      },
      error: (error) => console.error(error),
      complete: () => console.info('complete')

    });

  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);

  }

  deleteCompany(id: number): void {
  this.companyService.deleteCompany(id).subscribe({
    next: () => {
      this.companyList.update((companies) =>
        companies.filter(company => company.id !== id)
      );
    },
    error: (error) => console.error(error)
  });

}

}