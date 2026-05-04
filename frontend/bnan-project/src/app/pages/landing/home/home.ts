import { Component } from '@angular/core';
import { Navbar } from '../../../shared/navbar/navbar';
import { Footer } from '../../../shared/footer/footer';
import { Hero } from "../hero/hero";
import { Services } from "../services/services";
import { AboutUs } from "../about-us/about-us";
import { Contact } from "../contact/contact";

@Component({
  selector: 'app-home',
  imports: [Navbar, Footer, Hero, Services, AboutUs, Contact],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
