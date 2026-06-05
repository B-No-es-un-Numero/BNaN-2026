import { Component, inject, signal, input, output, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/users/user-service';
import { CreateUserRequest, User } from '../../../../model/user.model';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  userIdInput = input<number | null>(null);

  saved = output<void>();
  error = output<string>();
  canceled = output<void>();

  isCreating = signal(false);
  showPassword = signal(false);
  serverError = signal<string>('');

  form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    first_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    last_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    role: ['user', Validators.required],
  });

  togglePassword() {
    this.showPassword.set(!this.showPassword());
  }

  ngOnInit(): void {
    const userId = this.userIdInput();
    if (userId) {
      this.form.get('password')?.clearValidators();
      this.form.get('password')?.setValidators([Validators.minLength(6), Validators.maxLength(20)]);
      this.form.get('password')?.updateValueAndValidity();
      this.loadUser(userId);
    }
  }

  saveUser() {
    this.serverError.set('');

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isCreating.set(true);
    const data = this.form.getRawValue();
    const userId = this.userIdInput();

    if (userId) {
      const payload: CreateUserRequest = {
        username: data.username,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        role: data.role,
      };
      if (data.password) {
        payload.password = data.password;
      }

      this.userService.updateUser(userId, payload).subscribe({
        next: () => {
          this.saved.emit();
          this.isCreating.set(false);
        },
        error: (err) => {
          this.isCreating.set(false);
          this.serverError.set(this.parseServerError(err));
        }
      });

    } else {
      this.userService.createUser({
        username: data.username,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        role: data.role,
      }).subscribe({
        next: () => {
          this.saved.emit();
          this.form.reset({ role: 'user' });
          this.isCreating.set(false);
        },
        error: (err) => {
          this.isCreating.set(false);
          this.serverError.set(this.parseServerError(err));
        },
      });
    }
  }

  loadUser(id: number): void {
    this.userService.getUserById(id).subscribe({
      next: (user: User) => {
        this.form.patchValue({
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role,
        });
      },
      error: () => {
        this.serverError.set('No se pudo cargar el usuario. Intentá de nuevo.');
      },
    });
  }

  private parseServerError(err: any): string {
    const errors = err?.error?.errors;
    if (!errors) {
      return 'Ocurrió un error inesperado. Intentá de nuevo.';
    }
    if (errors.username) {
      return 'El nombre de usuario ya está en uso. Elegí uno diferente.';
    }
    if (errors.email) {
      return 'El email ingresado ya está registrado. Usá uno diferente.';
    }
    const firstKey = Object.keys(errors)[0];
    if (firstKey) {
      return `Error en el campo "${firstKey}": ${errors[firstKey][0]}`;
    }
    return 'Ocurrió un error al guardar. Revisá los datos e intentá de nuevo.';
  }

  onCancel(): void {
    this.canceled.emit();
  }
}
