import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { Toast } from '../../../shared/toast/toast';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, Toast],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);
  showPassword = signal(false);
  showConfirmPassword = signal(false);

  toastOpen = signal(false);
  toastMessage = signal('');
  toastType = signal<'success' | 'error' | 'info' | 'danger'>('success');

  registerForm = this.fb.nonNullable.group({
    first_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    last_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordsMatch });

  private passwordsMatch(group: AbstractControl) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  togglePassword() {
    this.showPassword.set(!this.showPassword());
  }

  toggleConfirmPassword() {
    this.showConfirmPassword.set(!this.showConfirmPassword());
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const { first_name, last_name, username, email, password } = this.registerForm.getRawValue();

    this.authService.register({ first_name, last_name, username, email, password }).subscribe({
      next: () => {
        this.loading.set(false);
        this.toastMessage.set('¡Cuenta creada exitosamente! Redirigiendo al inicio de sesión...');
        this.toastType.set('success');
        this.toastOpen.set(true);
        setTimeout(() => this.router.navigate(['/iniciar-sesion']), 2500);
      },
      error: (err) => {
        this.loading.set(false);
        let message = 'Error al conectar con el servidor.';
        if (err.error && typeof err.error === 'object') {
          const messages = Object.values(err.error).flat().join('. ');
          message = messages || message;
        }
        this.toastMessage.set(message);
        this.toastType.set('danger');
        this.toastOpen.set(true);
      }
    });
  }
}
