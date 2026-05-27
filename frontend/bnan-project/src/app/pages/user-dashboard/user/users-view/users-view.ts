import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Modal } from '../../../../shared/modal/modal';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../services/users/user-service';
import { User } from '../../../../model/user.model';
import { Toast } from "../../../../shared/toast/toast/toast";


@Component({
  selector: 'app-users-view',
  imports: [CommonModule, Modal, FormsModule, ReactiveFormsModule, Toast],
  templateUrl: './users-view.html'
})
export class UsersView {

  private UserService = inject(UserService)
  users = signal<User[]>([]);

  userForm: FormGroup;

  isEditModalOpen = signal(false);
  isDeleteModalOpen = signal(false);
  isViewModalOpen = signal(false);isAddModalOpen = signal(false);
  selectedUser = signal<User | null>(null);
  showPassword = signal(false);

  toasMessage = signal('');
  toasType = signal<'success' | 'error'>('success');
  toastOpen = signal(false);

  isCreating = signal(false);

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      first_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      last_name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['user', Validators.required]
    });
  }

  ngOnInit(): void {
    this.UserService.getUserList().subscribe({
      next: (data: any) => { this.users.set(data); },
      error: (error) => console.error(error),
      complete: () => console.info('complete')
    });
  }

  

  togglePassword() {
    this.showPassword.set(!this.showPassword());
  }

  newUser() {
    this.userForm.reset({ role: 'user' });
    this.isAddModalOpen.set(true);
  }

  saveNewUser() {
    if(this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.isCreating.set(true);
    this.userForm.disable();
    
    this.UserService.createUser(this.userForm.getRawValue()).subscribe({
      next: (newUser: any) => { 
        this.users.update(users => [...users, newUser]);
        this.showToast('Usuario creado exitosamente', 'success'); 
        this.closeModals();
        this.isCreating.set(false);
        this.userForm.enable();
      },
      error: (error) => {
        console.error('Error al crar usuario:', error)
        this.showToast('Error al crear usuario', 'error');
        this.isCreating.set(false);
        this.userForm.enable();
      },
    });

  }

  onSearch(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    this.UserService.getUserList(term).subscribe({
      next: (data: User[]) => { this.users.set(data); },
      error: (error) => console.error(error),
      complete: () => console.info('complete')
    });
  }

  editUser(user: User) {
    this.selectedUser.set(user);
    this.isEditModalOpen.set(true);
  }

  deleteUser(id: number) {
    this.isDeleteModalOpen.set(true);
  }

  viewUser(user: User) {
    this.selectedUser.set(user);
    this.isViewModalOpen.set(true);
  }

  closeModals() {
    this.isAddModalOpen.set(false);
    this.isEditModalOpen.set(false);
    this.isViewModalOpen.set(false);
    this.isDeleteModalOpen.set(false);
  }

  showToast(message: string, type: 'success' | 'error') {
    this.toasMessage.set(message);
    this.toasType.set(type);
    this.toastOpen.set(true);
    setTimeout(() => this.toastOpen.set(false), 4000);
  }
}
