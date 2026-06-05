import { Component, inject, signal, input, output, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../../services/task/task-service';
import { UserService } from '../../../../services/users/user-service';
import { ClientService } from '../../../../services/client/client-service';
import { User } from '../../../../model/user.model';
import { Client } from '../../../../model/client.model';

@Component({
  selector: 'app-task-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tasks-form.html',
  styleUrl: './tasks-form.css',
})
export class TasksForm implements OnInit {

  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private userService = inject(UserService);
  private clientService = inject(ClientService);

  taskIdInput = input<number | null>(null);

  saved = output<void>();
  error = output<string>();
  canceled = output<void>();

  isCreating = signal(false);
  serverError = signal<string>('');

  users = signal<User[]>([]);
  clients = signal<Client[]>([]);

  ngOnInit(): void {
    this.loadUsers();
    this.loadClients();
    const taskId = this.taskIdInput();
    if (taskId) {
      this.loadTask(taskId);
    }
  }

  loadUsers(): void {
    this.userService.getUserList().subscribe({
      next: (data: User[]) => this.users.set(data),
      error: () => this.serverError.set('No se pudieron cargar los usuarios disponibles.'),
    });
  }

  loadClients(): void {
    this.clientService.getClientList().subscribe({
      next: (data: Client[]) => this.clients.set(data),
      error: () => this.serverError.set('No se pudieron cargar los clientes disponibles.'),
    });
  }

  loadTask(id: number): void {
    this.taskService.getTaskById(id).subscribe({
      next: (task) => {
        this.form.patchValue({
          title: task.title,
          description: task.description,
          due_date: task.due_date,
          status: task.status,
          assigned_user_id: task.assigned_user_id,
          client_id: task.client_id,
        });
      },
      error: () => {
        this.serverError.set('No se pudo cargar la tarea. Intentá de nuevo.');
      },
    });
  }

  form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', Validators.required],
    due_date: ['', [Validators.required, (c: any) => {
      if (!c.value) return null;
      const today = new Date(); today.setHours(0, 0, 0, 0);
      return new Date(c.value) < today ? { minDate: true } : null;
    }]],
    status: ['pending', Validators.required],
    assigned_user_id: [0, [Validators.required, Validators.min(1)]],
    client_id: [0, [Validators.required, Validators.min(1)]],
  });

  saveTask() {
    this.serverError.set('');

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isCreating.set(true);

    const data = this.form.getRawValue();
    const taskData = {
      title: data.title,
      description: data.description,
      due_date: data.due_date,
      status: data.status,
      client: data.client_id,
      assigned_user: data.assigned_user_id,
    };

    const taskId = this.taskIdInput();

    if (taskId) {
      this.taskService.updateTask(taskId, taskData).subscribe({
        next: () => {
          this.saved.emit();
          this.isCreating.set(false);
        },
        error: () => {
          this.serverError.set('No se pudo actualizar la tarea. Verificá los datos e intentá de nuevo.');
          this.isCreating.set(false);
        },
      });
    } else {
      this.taskService.createTask(taskData).subscribe({
        next: () => {
          this.saved.emit();
          this.form.reset({ status: 'pending', assigned_user_id: 0, client_id: 0 });
          this.isCreating.set(false);
        },
        error: () => {
          this.serverError.set('No se pudo crear la tarea. Verificá los datos e intentá de nuevo.');
          this.isCreating.set(false);
        },
      });
    }
  }

  onCancel(): void {
    this.canceled.emit();
  }
}