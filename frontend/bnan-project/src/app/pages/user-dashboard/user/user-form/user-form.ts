import { Component, inject, signal, input, output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/users/user-service';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  userIdInput = input<number | null>(null);

  saved = output<void>();
  errored = output<string>();
  canceled = output<void>();

  isCreating = signal(false);

  showPassword = signal(false);

  form = this.fb.nonNullable.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
      ],
    ],
    first_name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ],
    ],
    last_name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    role: ['user', Validators.required],
  });

  togglePassword() {
    this.showPassword.set(!this.showPassword());
  }

  saveUser() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isCreating.set(true);
    const data = this.form.getRawValue();

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
        this.form.reset();
        this.isCreating.set(false);
      },
      error: (error) => {
        console.error(error);
        this.errored.emit('Error al registrar el usuario');
        this.isCreating.set(false);
      }
    });
  }

  onCancel(): void {
    this.canceled.emit();
  }
}
