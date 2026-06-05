import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-user-navbar',

  imports: [RouterLink, RouterLinkActive],
  templateUrl: './user-navbar.html',
  styleUrl: './user-navbar.css',
})
export class UserNavbar {
  private router = inject(Router);
  auth = inject(AuthService);
  isMobileOpen = signal(false);

  toggleMobile(): void {
    this.isMobileOpen.update(v => !v);
  }

  closeMobile(): void {
    this.isMobileOpen.set(false);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/iniciar-sesion']);
  }
}