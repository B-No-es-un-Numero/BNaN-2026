import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClientService } from '../../../services/client/client-service';
import { CreateClientRequest } from '../../../model/client.model';
import { Toast } from '../../../shared/toast/toast/toast';

@Component({
  selector: 'app-client-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, Toast],
  templateUrl: './client-form.html',
})
export class ClientForm {
  private fb = inject(FormBuilder);
  private clientService = inject(ClientService);

  toastOpen = signal(false);
  toastMessage = signal('');
  toastType = signal<'success' | 'error' | 'info'>('success');

  showToast(message: string, type: 'success' | 'error' | 'info') {
    this.toastMessage.set(message);
    this.toastType.set(type);
    this.toastOpen.set(true);
    setTimeout(() => this.toastOpen.set(false), 4000);
  }

  form = this.fb.nonNullable.group({
    name: [
      '',
      [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    dni: ['', [Validators.required, Validators.pattern(/^\d{7,8}$/)]],
    date_of_birth: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
    phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    status: ['', [Validators.required]],
  });

  submit() {
    if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }
  this.clientService.createClient(this.form.getRawValue() as CreateClientRequest)
    .subscribe({ next: () => {
        this.showToast('El cliente se registró exitosamente', 'success');
        this.form.reset();
      },
      error: (error) => {console.error(error); }
    });
}
}
