import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserNavbar } from './user-navbar/user-navbar';

@Component({
  selector: 'app-user-dashboard',
  imports: [UserNavbar, RouterOutlet],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})
export class UserDashboard {}
