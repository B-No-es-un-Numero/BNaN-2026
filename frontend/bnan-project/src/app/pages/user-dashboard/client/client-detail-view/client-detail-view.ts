import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClientService } from '../../../../services/client/client-service';

interface ClientDetail {
  id: number;
  name: string;
  email: string;
  dni: string;
  date_of_birth: string;
  phone: string;
  status: string;
  enabled: boolean;
  created_at: string;
  updated_at: string;
  company_name: string;
  responsible_name: string;
}

@Component({
  selector: 'app-client-detail-view',
  imports: [RouterLink],
  templateUrl: './client-detail-view.html',
  styleUrl: './client-detail-view.css',
})

export class ClientDetailView implements OnInit {
  private clientService = inject(ClientService);
  private route = inject(ActivatedRoute);

  client = signal<ClientDetail>({} as ClientDetail);
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);

      this.clientService.getClientById(id)
        .subscribe({
          next: (response: any) => {
            this.client?.set(response);

          },
          error: (error) => {
            console.error(error);
          }
        });

    });

  }
}
