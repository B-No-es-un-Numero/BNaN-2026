import { CommonModule } from '@angular/common';
import { Component, inject, signal, OnInit } from '@angular/core';
import { Modal } from '../../../../shared/modal/modal';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../services/users/user-service';
import { User } from '../../../../model/user.model';
import { Toast } from '../../../../shared/toast/toast/toast';
import { UserForm } from '../user-form/user-form';

@Component({
  selector: 'app-users-view',
  imports: [CommonModule, Modal, FormsModule, Toast, UserForm],
  templateUrl: './users-view.html',
})
export class UsersView implements OnInit {
  private UserService = inject(UserService);
  users = signal<User[]>([]);

  isUserModalOpen = signal(false);
  selectedUserId = signal<number | null>(null);

  isDeleteModalOpen = signal(false);
  userToDeleteId = signal<number | null>(null);

  isViewModalOpen = signal(false);
  selectedUser = signal<User | null>(null);

  toasMessage = signal('');
  toasType = signal<'success' | 'error'>('success');
  toastOpen = signal(false);

  ngOnInit(): void {
    this.UserService.getUserList().subscribe({
      next: (data: any) => {
        this.users.set(data);
      },
      error: (error) => console.error(error),
    });
  }

  newUser() {
    this.selectedUserId.set(null);
    this.isUserModalOpen.set(true);
  }

  editUser(user: User) {
    this.selectedUserId.set(user.id);
    this.isUserModalOpen.set(true);
  }

  closeUserModal() {
    this.isUserModalOpen.set(false);
    this.selectedUserId.set(null);
  }

  handleUserSaved(): void {
    const wasEdited = this.selectedUserId() !== null;
    this.closeUserModal();
    this.showToast(
      wasEdited ? 'Usuario actualizado exitosamente' : 'Usuario creado exitosamente',
      'success'
    );
    this.UserService.getUserList().subscribe({
      next: (data: any) => {
        this.users.set(data);
      },
      error: (error) => console.error(error),
    });
  }

  handleUsererror(message: string): void {
    this.showToast(message, 'error');
  }

  onSearch(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    this.UserService.getUserList(term).subscribe({
      next: (data: User[]) => {
        this.users.set(data);
      },
      error: (error) => console.error(error),
    });
  }

  confirmDeleteUser(id: number) {
    this.userToDeleteId.set(id);
    this.isDeleteModalOpen.set(true);
  }

  deleteUser() {
    const id = this.userToDeleteId();
    if (id === null) return;

    this.UserService.deleteUser(id).subscribe({
      next: () => {
        this.users.update((users) => users.filter((u) => u.id !== id));
        this.showToast('Usuario eliminado exitosamente', 'success');
        this.closeDeleteModal();
      },
      error: (error) => {
        console.error(error);
        this.showToast('Error al eliminar usuario', 'error');
      },
    });
  }

  closeDeleteModal() {
    this.isDeleteModalOpen.set(false);
    this.userToDeleteId.set(null);
  }

  viewUser(user: User) {
    this.selectedUser.set(user);
    this.isViewModalOpen.set(true);
  }

  closeViewModal() {
    this.isViewModalOpen.set(false);
    this.selectedUser.set(null);
  }

  closeModals() {
    this.closeUserModal();
    this.closeDeleteModal();
    this.closeViewModal();
  }

  showToast(message: string, type: 'success' | 'error') {
    this.toasMessage.set(message);
    this.toasType.set(type);
    this.toastOpen.set(true);
    setTimeout(() => this.toastOpen.set(false), 4000);
  }
}
