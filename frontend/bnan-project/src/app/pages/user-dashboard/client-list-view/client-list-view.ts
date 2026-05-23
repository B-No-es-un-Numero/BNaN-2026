import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../../services/client-service';

@Component({
  selector: 'app-client-list-view',
  imports: [RouterLink, FormsModule],
  templateUrl: './client-list-view.html',
  styleUrl: './client-list-view.css',
})
export class ClientListView implements OnInit {

  private clientService = inject(ClientService);

  clientList = signal<any[]>([]);
  searchTerm = signal<string>('');
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
}