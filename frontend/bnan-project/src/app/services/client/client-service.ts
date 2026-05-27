import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Client, CreateClientRequest } from '../../model/client.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly baseUrl = `${environment.apiUrl}/clientes`;
  private http = inject(HttpClient);

  public createClient(clientData: CreateClientRequest) {
    return this.http.post<Client>(this.baseUrl, clientData);
  }

  public getClientList() {
    return this.http.get<Client[]>(this.baseUrl);
  }

  public getClientById(id: number) {
    return this.http.get<Client>(`${this.baseUrl}/${id}/`);
  }

  public updateClient(id: number, clientData: any) {
    return this.http.put<Client>(`${this.baseUrl}/${id}/`, clientData);
  }

  public deleteClient(id: number, hard: boolean = false) {
    return this.http.delete<void>(`${this.baseUrl}/${id}/?hard=${hard}`);
  }
}