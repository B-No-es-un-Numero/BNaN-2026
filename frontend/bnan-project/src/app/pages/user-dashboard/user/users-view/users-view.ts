import { CommonModule } from '@angular/common';
import { Component, inject, signal, OnInit } from '@angular/core';
import { Modal } from '../../../../shared/modal/modal';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../services/users/user-service';
import { User } from '../../../../model/user.model';
import { Toast } from '../../../../shared/toast/toast';
import { UserForm } from '../user-form/user-form';
import { TableColumn } from '../../../../model/table-column.model';
import { DataTable } from '../../../../shared/data-table/data-table';
import { TableTemplateDirective } from '../../../../shared/data-table/table-template.directive';
import { HasRoleDirective } from '../../../../shared/directives/has-role.directive';


@Component({
  selector: 'app-users-view',
  imports: [CommonModule, Modal, FormsModule, Toast, UserForm, DataTable, TableTemplateDirective, HasRoleDirective],
  templateUrl: './users-view.html',
})
export class UsersView implements OnInit {
  private UserService = inject(UserService);
  users = signal<User[]>([]);
  loadingUsers = signal(false);

  userColumns: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'full_name', label: 'Nombre' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Rol' },
    { key: 'actions', label: 'Acciones', align: 'end' },
  ];

  isUserModalOpen = signal(false);
  selectedUserId = signal<number | null>(null);

  isDeleteModalOpen = signal(false);
  isHardDelete = signal(false);
  userToDeleteId = signal<number | null>(null);

  isViewModalOpen = signal(false);
  selectedUser = signal<User | null>(null);

  toastMessage = signal('');
  toastType = signal<'success' | 'error'>('success');
  toastOpen = signal(false);

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(search?: string): void {
    this.loadingUsers.set(true);
    this.UserService.getUserList(search).subscribe({
      next: (data: any) => {
        this.users.set(data);
        this.loadingUsers.set(false);
      },
      error: (error) => {
        this.loadingUsers.set(false);
        console.error(error);
      },
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
    this.loadUsers();
  }

  handleUsererror(message: string): void {
    this.showToast(message, 'error');
  }

  onSearch(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    this.loadUsers(term || undefined);
  }

  confirmDeleteUser(id: number, hardDelete: boolean) {
    this.userToDeleteId.set(id);
    this.isHardDelete.set(hardDelete);
    this.isDeleteModalOpen.set(true);
  }

  deleteUser() {
    const id = this.userToDeleteId();
    if (id === null) return;
    if (this.isHardDelete()){
      this.UserService.hardDeleteUser(id).subscribe({
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
    } else {
    this.UserService.softDeleteUser(id).subscribe({
      next: () => {
        this.users.update((users) => users.filter((u) => u.id !== id));
        this.showToast('Usuario ocultado exitosamente', 'success');
        this.closeDeleteModal();
      },
      error: (error) => {
        console.error(error);
        this.showToast('Error al ocultado usuario' + error.error.message, 'error');
      },
    });
  }
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
    this.toastMessage.set(message);
    this.toastType.set(type);
    this.toastOpen.set(true);
    setTimeout(() => this.toastOpen.set(false), 4000);
  }
}
