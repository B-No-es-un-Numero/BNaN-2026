import { Component } from '@angular/core';
import { InfoCard } from '../../shared/info-card/info-card';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, InfoCard],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {}
