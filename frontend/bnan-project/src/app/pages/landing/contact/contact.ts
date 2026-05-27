import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Toast } from '../../../shared/toast/toast/toast';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule, Toast],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  formData = {
    name: '',
    email: '',
    company: '',
    message: ''
  };

  toastOpen = signal(false);
  toastMessage = signal('');
  toastType = signal<'success' | 'error' | 'info'>('success');

  showToast(message: string, type: 'success' | 'error' | 'info') {
    this.toastMessage.set(message);
    this.toastType.set(type);
    this.toastOpen.set(true);
    setTimeout(() => this.toastOpen.set(false), 4000);
  }

  handleSubmit(f: NgForm) {
    if (f.valid) {
      console.log('Datos del formulario:', this.formData);
      this.showToast('¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.', 'success');
      f.resetForm();
    }
  }
}
