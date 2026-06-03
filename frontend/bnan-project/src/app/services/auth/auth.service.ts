import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';

interface LoginResponse {
  access: string;
  refresh: string;
  role?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}/auth`;
  private readonly TOKEN_KEY = 'bnan_token';
  private readonly REFRESH_KEY = 'bnan_refresh_token';
  private readonly ROLE_KEY = 'bnan_role';

  private http = inject(HttpClient);

  private _isAdmin = signal<boolean>(false);
  isAdmin = this._isAdmin.asReadonly();

  constructor() {
    if (typeof localStorage !== 'undefined') {
      const role = localStorage.getItem(this.ROLE_KEY);
      if (role === 'admin') {
        this._isAdmin.set(true);
      }
    }
  }

  register(data: { first_name: string; last_name: string; username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/`, data);
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login/`, { username, password }).pipe(
      tap(response => {
        localStorage.setItem(this.TOKEN_KEY, response.access);
        localStorage.setItem(this.REFRESH_KEY, response.refresh);
        if (response.role) {
          localStorage.setItem(this.ROLE_KEY, response.role);
          this._isAdmin.set(response.role === 'admin');
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    this._isAdmin.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}