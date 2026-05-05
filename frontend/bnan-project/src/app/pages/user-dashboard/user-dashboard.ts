import { Component } from '@angular/core';
import { Footer } from '../../shared/footer/footer';
import { UserNavbar } from './user-navbar/user-navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  imports: [Footer, UserNavbar, RouterOutlet],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css',
})
export class UserDashboard {}
