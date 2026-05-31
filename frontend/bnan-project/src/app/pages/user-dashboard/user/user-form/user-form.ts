import { Component, inject, signal, input, output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/users/user-service';
import { OnInit } from '@angular/core';
import { User } from '../../../../model/user.model';

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

  form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
    first_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    last_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
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
      this.form.get('password')?.setValidators([Validators.minLength(6), Validators.maxLength(10)]);
      this.form.get('password')?.updateValueAndValidity();
      this.loadUser(userId);
    }
  }

  saveUser() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isCreating.set(true);
    const data = this.form.getRawValue();

    const userId = this.userIdInput();

    if (userId) {
      const payload: any = {
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
        error: (error) => {
          console.error(error);
          this.error.emit('Error al actualizar usuario');
          this.isCreating.set(false);
        }
      });

    } else {

      this.userService
        .createUser({
          username: data.username,
          password: data.password,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          role: data.role,
        })
        .subscribe({
          next: () => {
            this.saved.emit();
            this.form.reset();
            this.isCreating.set(false);
          },
          error: (error) => {
            console.error(error);
            this.error.emit('Error al registrar el usuario');
            this.isCreating.set(false);
          },
        });
    }
  }

  loadUser(id: number): void {
    
    this.userService.getUserById(id).subscribe({
      next: (user:User) => {
        this.form.patchValue({
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role,
        });
      },
      error: (error) => {
        console.error(error);
        this.error.emit('Error al cargar usuario');
      },
    });
  }

  onCancel(): void {
    this.canceled.emit();
  }
}
