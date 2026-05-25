import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ClientService } from '../../../services/client/client-service';

@Component({
  selector: 'app-client-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './client-form.html',
})
export class ClientForm {
  private fb = inject(FormBuilder);
  private clientService = inject(ClientService);

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
  this.clientService.createClient(this.form.getRawValue())
    .subscribe({ next: () => {
        alert('El cliente se registró exitosamente');
        this.form.reset();
      },
      error: (error) => {console.error(error); }
    });
}
}
