import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';


@Injectable({ providedIn: 'root' })
export class AuthService {
    private readonly baseUrl = `${environment.apiUrl}/auth`;
    
    private http = inject(HttpClient);

    private _isAdmin = signal<boolean>(true);
    isAdmin = this._isAdmin.asReadonly();
    private readonly TOKEN_KEY = 'bnan_token';

    register(data: { first_name: string; last_name: string; username: string; email: string; password: string }): Observable<any> {
        return this.http.post(`${this.baseUrl}/register/`, data);
    }

    login(username: string): void {
        if (username === 'admin@test.com') {
        this._isAdmin.set(true);
        } else if(username === 'user@test.com') {
        this._isAdmin.set(false);
        }
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}