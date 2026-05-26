import { Component, input, output } from '@angular/core';
import { ClientForm } from '../client-form/client-form';

@Component({
  selector: 'app-client-modal',
  imports: [ClientForm],
  templateUrl: './client-modal.html',
  styleUrl: './client-modal.css',
})
export class ClientModal {
  isOpen = input<boolean>(false);
  clientId = input<number | null>(null);

  close = output<void>();
  saved = output<void>();

  onClose() {
    this.close.emit();
  }

  onSaved() {
    this.saved.emit();
  }
}