import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface ClientDetail {
  clientName: string;
  clientEmail: string;
  clientDNI: string;
  clientDateOfBirth: string;
  clientPhone: string;
  clientStatus: string;
  clientCompany: string;
  clientResponsible: string;
  clientCreatedAt: string;
  clientUpdatedAt: string;
}

@Component({
  selector: 'app-client-detail-view',
  imports: [RouterLink],
  templateUrl: './client-detail-view.html',
  styleUrl: './client-detail-view.css',
})
export class ClientDetailView {
  client: ClientDetail = {
    clientName: 'Juan Pérez',
    clientEmail: 'juan1@gmail.com',
    clientDNI: '30000001',
    clientDateOfBirth: '1985-03-15',
    clientPhone: '+5493511111111',
    clientStatus: 'lead',
    clientCompany: 'Mercado Libre',
    clientResponsible: 'Luciano Herrera',
    clientCreatedAt: '2026-04-28',
    clientUpdatedAt: '2026-05-05',
  };
}
