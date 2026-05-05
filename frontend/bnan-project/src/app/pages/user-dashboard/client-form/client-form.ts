import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './client-form.html',
})
export class ClientForm {
  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    nameSurname: [
      '',
      [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    dni: ['', [Validators.required, Validators.pattern(/^\d{7,8}$/)]],
    dateOfBirth: ['', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}\/\d{4}$/)]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    status: ['', [Validators.required]],
  });

  submit() {
    if (this.form.valid) {
      alert('El cliente se registró exitosamente');
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
