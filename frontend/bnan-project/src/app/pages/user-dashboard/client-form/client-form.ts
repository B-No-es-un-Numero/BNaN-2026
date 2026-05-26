import { Component, inject, OnInit, input, output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client-service';

@Component({
  selector: 'app-client-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-form.html',
})
export class ClientForm implements OnInit {
  private fb = inject(FormBuilder);
  private clientService = inject(ClientService);
  private router = inject(Router);

  clientIdInput = input<number | null>(null);
  insideModal = input<boolean>(false);

  saved = output<void>();
  canceled = output<void>();

  clientId: number | null = null;
  isEditMode = false;

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

  ngOnInit(): void {
    const id = this.clientIdInput();

    if (id === null) {
      return;
    }

    this.clientId = id;
    this.isEditMode = true;

    this.clientService.getClientById(this.clientId).subscribe({
      next: (client: any) => {
        this.form.patchValue({
          name: client.name,
          email: client.email,
          dni: client.dni,
          date_of_birth: client.date_of_birth,
          phone: client.phone ?? '',
          status: client.status,
        });
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const clientData = this.form.getRawValue();

    if (this.isEditMode && this.clientId !== null) {
      this.clientService.updateClient(this.clientId, clientData).subscribe({
        next: () => {
          alert('El cliente se actualizó exitosamente');

          if (this.insideModal()) {
            this.saved.emit();
            return;
          }

          this.router.navigate(['/dashboard/clientes']);
        },
        error: (error) => {
          console.error(error);
        }
      });

      return;
    }

    this.clientService.createClient(clientData).subscribe({
      next: () => {
        alert('El cliente se registró exitosamente');

        if (this.insideModal()) {
          this.saved.emit();
          return;
        }

        this.form.reset();
      },
      error: (error) => {
        console.error(error);
        alert(JSON.stringify(error.error));
      }
    });
  }

  onCancel(): void {
    if (this.insideModal()) {
      this.canceled.emit();
      return;
    }

    this.router.navigate(['/dashboard/clientes']);
  }
}