import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InfoCard } from './shared/info-card/info-card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InfoCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bnan-project');
}
