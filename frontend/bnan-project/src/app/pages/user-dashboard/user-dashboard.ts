import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { UserNavbar } from './user-navbar/user-navbar';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-user-dashboard',
  imports: [UserNavbar, RouterOutlet],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})
export class UserDashboard implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private auth = inject(AuthService);

  ngOnInit(): void {
    const defaultRoute = this.auth.isAdmin() ? 'usuarios' : 'clientes';
    this.router.navigate([defaultRoute], { relativeTo: this.route, replaceUrl: true });
  }
}
