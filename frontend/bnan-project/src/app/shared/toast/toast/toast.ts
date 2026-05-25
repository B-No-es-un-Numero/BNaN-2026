import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  isOpen = input<boolean>(false);
  message = input<string>('');
  type = input<'success' | 'error' | 'info'>('info');

  close= output<void>();

  onClose() {
    this.close.emit();
  }
}
