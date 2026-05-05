import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Client {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientCompany: string;
  clientState: string;
}

@Component({
  selector: 'app-client-list-view',
  imports: [RouterLink],
  templateUrl: './client-list-view.html',
  styleUrl: './client-list-view.css',
})
export class ClientListView {
  clients: Client[] = [
    {
      clientName: 'Juan Pérez',
      clientEmail: 'juan1@gmail.com',
      clientPhone: '+5493511111111',
      clientCompany: 'Mercado Libre',
      clientState: 'lead',
    },
    {
      clientName: 'María Gómez',
      clientEmail: 'maria@gmail.com',
      clientPhone: '+5493512222222',
      clientCompany: 'Globant',
      clientState: 'active',
    },
    {
      clientName: 'Carlos López',
      clientEmail: 'carlos@gmail.com',
      clientPhone: '+5493513333333',
      clientCompany: 'YPF',
      clientState: 'closed',
    },
    {
      clientName: 'Ana Martínez',
      clientEmail: 'ana@gmail.com',
      clientPhone: '+5493514444444',
      clientCompany: 'Arcor',
      clientState: 'lead',
    },
    {
      clientName: 'Luis Fernández',
      clientEmail: 'luis@gmail.com',
      clientPhone: '+5493515555555',
      clientCompany: 'Techint',
      clientState: 'active',
    },
    {
      clientName: 'Sofía Rodríguez',
      clientEmail: 'sofia@gmail.com',
      clientPhone: '+5493516666666',
      clientCompany: 'Despegar',
      clientState: 'closed',
    },
    {
      clientName: 'Diego Sánchez',
      clientEmail: 'diego@gmail.com',
      clientPhone: '+5493517777777',
      clientCompany: 'PedidosYa',
      clientState: 'lead',
    },
    {
      clientName: 'Lucía Romero',
      clientEmail: 'lucia@gmail.com',
      clientPhone: '+5493518888888',
      clientCompany: 'Santander Argentina',
      clientState: 'active',
    },
    {
      clientName: 'Mateo Díaz',
      clientEmail: 'mateo@gmail.com',
      clientPhone: '+5493519999999',
      clientCompany: 'BBVA Argentina',
      clientState: 'closed',
    },
    {
      clientName: 'Valentina Castro',
      clientEmail: 'valentina@gmail.com',
      clientPhone: '+5493511010101',
      clientCompany: 'Naranja X',
      clientState: 'lead',
    },
  ];
}