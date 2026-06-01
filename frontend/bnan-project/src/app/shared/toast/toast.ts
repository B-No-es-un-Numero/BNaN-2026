import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  isOpen = input<boolean>(false);
  message = input<string>('');
  type = input<'success' | 'error' | 'info' | 'danger'>('info');

  close = output<void>();

  bgClass = computed(() => {
    const t = this.type();
    return t === 'error' ? 'danger' : t;
  });

  iconClass = computed(() =>
    this.type() === 'success'
      ? 'bi-check-circle-fill'
      : 'bi-exclamation-triangle-fill'
  );

  onClose() {
    this.close.emit();
  }
}
