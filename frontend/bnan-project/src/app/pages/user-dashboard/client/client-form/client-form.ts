import { Component, inject, signal, OnInit, input, output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClientService } from '../../../../services/client/client-service';
import { Client, CreateClientRequest } from '../../../../model/client.model';

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
  saved = output<void>();
  error = output<string>();
  cancelled = output<void>();
  isEditMode = false;
  isCreating = signal(false);

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
    this.isEditMode = true;

    this.clientService.getClientById(id).subscribe({
      next: (client: Client) => {
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
        this.error.emit('Error al buscar el usuario. Si persiste, comuníquese con administración.');
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isCreating.set(true);
    const clientData = this.form.getRawValue() as CreateClientRequest;

    if (this.isEditMode && this.clientIdInput() !== null) {
      this.clientService.updateClient(this.clientIdInput()!, clientData).subscribe({
        next: () => {
          this.saved.emit();
          this.router.navigate(['/dashboard/clientes']);
          this.isCreating.set(false);
        },
        error: (error) => {
          console.error(error);
          this.error.emit('Error al actualizar el cliente');
          this.isCreating.set(false);
        },
      });

      return;
    }

    this.clientService.createClient(clientData).subscribe({
      next: () => {
        this.saved.emit();
        this.form.reset();
        this.isCreating.set(false);
      },
      error: (error) => {
        this.error.emit('Error al registrar el cliente. Si el mismo persiste, comuníquese con administración.');
        this.isCreating.set(false);
      }
    });
  }

  onCancel(): void {
    this.cancelled.emit();
    this.router.navigate(['/dashboard/clientes']);
  }
}