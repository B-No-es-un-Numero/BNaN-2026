import { Component, inject, signal, OnInit, input, output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client/client-service';
import { CreateClientRequest } from '../../../model/client.model';
import { Toast } from '../../../shared/toast/toast/toast';


@Component({
  selector: 'app-client-form',
  imports: [CommonModule, ReactiveFormsModule, Toast],
  templateUrl: './client-form.html',
})
export class ClientForm implements OnInit {
  private fb = inject(FormBuilder);
  private clientService = inject(ClientService);
  private router = inject(Router);

  clientIdInput = input<number | null>(null);

  saved = output<void>();
  canceled = output<void>();

  clientId: number | null = null;
  isEditMode = false;

  toastOpen = signal(false);
  toastMessage = signal('');
  toastType = signal<'success' | 'error' | 'info'>('success');

  isCreating = signal(false);

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

    this.isCreating.set(true);
    const clientData = this.form.getRawValue() as CreateClientRequest;

    if (this.isEditMode && this.clientId !== null) {
      this.clientService.updateClient(this.clientId, clientData).subscribe({
        next: () => {
          this.showToast('El cliente se actualizó exitosamente', 'success');
          this.saved.emit();
          this.router.navigate(['/dashboard/clientes']);
          this.isCreating.set(false);
        },
        error: (error) => {
          console.error(error);
          this.showToast('Error al actualizar el cliente', 'error');
          this.isCreating.set(false);
        }
      });

      return;
    }

    this.clientService.createClient(clientData).subscribe({
      next: () => {
        this.showToast('El cliente se registró exitosamente', 'success');
        this.saved.emit();
        this.form.reset();
        this.isCreating.set(false);
      },
      error: (error) => {
        console.error(error);
        this.showToast('Error al registrar el cliente', 'error');
        this.isCreating.set(false);
      }
    });
  }

  onCancel(): void {
    this.canceled.emit();
    this.router.navigate(['/dashboard/clientes']);
  }
}