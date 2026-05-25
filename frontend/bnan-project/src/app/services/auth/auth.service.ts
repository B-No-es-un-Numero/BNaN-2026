import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _isAdmin = signal<boolean>(false);

    isAdmin = this._isAdmin.asReadonly();
    private readonly TOKEN_KEY = 'bnan_token';

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