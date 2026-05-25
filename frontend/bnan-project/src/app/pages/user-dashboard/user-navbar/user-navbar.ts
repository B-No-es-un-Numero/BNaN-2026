import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-user-navbar',

  imports: [RouterLink, RouterLinkActive],
  templateUrl: './user-navbar.html',
  styleUrl: './user-navbar.css',
})
export class UserNavbar {

  auth = inject(AuthService);
}