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

  constructor(private http: HttpClient) {}

  public createUser(data: CreateUserRequest): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/auth/register/`, data);
  }

  public getUserList(search?: string): Observable<User[]> {
    const params = search ? `?search=${encodeURIComponent(search)}` : '';
    return this.http.get<User[]>(`${this.baseUrl}${params}`);
  }

  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}/`);
  }

  public updateUser(id: number, data: CreateUserRequest): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}/`, data);
  }

   public softDeleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/`);
  }

  public hardDeleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/?hard=true`);
  }
}
