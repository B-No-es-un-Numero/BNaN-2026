import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../../model/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly baseUrl = '${environment.apiUrl}'; 
  constructor(private http:HttpClient){}

  public createClient(clientData: Client) { // tipar
    return this.http.post(this.baseUrl, clientData);
  }
  
  public getClientList(){
    return this.http.get<Client[]>(this.baseUrl);
  }

  public getClientById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}/`);
  }

}