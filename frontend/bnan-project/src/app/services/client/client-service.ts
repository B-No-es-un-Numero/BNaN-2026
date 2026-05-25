import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateClientRequest } from '../../model/client.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly baseUrl = `${environment.apiUrl}/clientes`; 
  constructor(private http:HttpClient){}

  public createClient(clientData: CreateClientRequest) {
    return this.http.post(this.baseUrl, clientData);
  }
  
  public getClientList(){
    return this.http.get(this.baseUrl);
  }

  public getClientById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}/`);
  }

}