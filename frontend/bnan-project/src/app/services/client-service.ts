import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  url="http://localhost:8000/api/clientes"
  constructor(private http:HttpClient){}

  public createClient(clientData: any) {
    return this.http.post(this.url, clientData);
  }
  
  public getClientList(){
    return this.http.get(this.url);
  }

  public getClientById(id: number) {
    return this.http.get(`${this.url}/${id}/`);
  }

  public updateClient(id: number, clientData: any) {
    return this.http.put(`${this.url}/${id}/`, clientData);
  }

  public deleteClient(id: number, hard: boolean = false) {
    return this.http.delete(`${this.url}/${id}/?hard=${hard}`);
  }

}