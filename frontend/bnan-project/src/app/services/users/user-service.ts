import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserRequest, User } from '../../model/user.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http:HttpClient){}

  public createUser(data: User) {
    return this.http.post(this.baseUrl, data);
  }
  
  public getUserList(): Observable<CreateUserRequest[]>{
    return this.http.get<CreateUserRequest[]>(this.baseUrl);
  }

  public getUserById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}/`);
  }

}
