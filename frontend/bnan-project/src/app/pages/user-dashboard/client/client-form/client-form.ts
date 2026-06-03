import { Component, inject, signal, OnInit, input, output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClientService } from '../../../../services/client/client-service';
import { CompanyService } from '../../../../services/company/company-service';
import { UserService } from '../../../../services/users/user-service';
import { Client, CreateClientRequest } from '../../../../model/client.model';
import { Company } from '../../../../model/company.model';
import { User } from '../../../../model/user.model';

@Component({
  selector: 'app-client-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-form.html',
})
export class ClientForm implements OnInit {
  private fb = inject(FormBuilder);
  private clientService = inject(ClientService);
  private companyService = inject(CompanyService);
  private userService = inject(UserService);
  private router = inject(Router);

  clientIdInput = input<number | null>(null);
  saved = output<void>();
  error = output<string>();
  cancelled = output<void>();
  isEditMode = false;
  isCreating = signal(false);
  companies = signal<Company[]>([]);
  users = signal<User[]>([]);
  serverError = signal<string>('');

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
    date_of_birth: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    company: [null as number | null],
    responsible_user: [null as number | null],
    status: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.companyService.getCompanyList().subscribe({
      next: (companies) => this.companies.set(companies),
      error: () => console.error('Error fetching companies')
    });

    this.userService.getUserList().subscribe({
      next: (users) => this.users.set(users),
      error: () => console.error('Error fetching users')
    });

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
          company: client.company,
          responsible_user: client.responsible_user,
          status: client.status,
        });
      },
      error: () => {
        this.serverError.set('No se pudo cargar el cliente. Intentá de nuevo.');
      }
    });
  }

  submit() {
    this.serverError.set('');

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
        error: (err) => {
          this.isCreating.set(false);
          this.serverError.set(this.parseServerError(err));
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
      error: (err) => {
        this.isCreating.set(false);
        this.serverError.set(this.parseServerError(err));
      }
    });
  }

  private parseServerError(err: any): string {
    const errors = err?.error?.errors;
    if (!errors) {
      return 'Ocurrió un error inesperado. Intentá de nuevo.';
    }
    if (errors.email) {
      return 'El email ingresado ya está registrado. Usá uno diferente.';
    }
    if (errors.dni) {
      return 'El DNI ingresado ya está registrado. Verificá el número.';
    }
    const firstKey = Object.keys(errors)[0];
    if (firstKey) {
      return `Error en el campo "${firstKey}": ${errors[firstKey][0]}`;
    }
    return 'Ocurrió un error al guardar. Revisá los datos e intentá de nuevo.';
  }

  onCancel(): void {
    this.cancelled.emit();
    this.router.navigate(['/dashboard/clientes']);
  }
}