import { Component, inject, signal, input, output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../../services/task/task-service';
import { UserService } from '../../../../services/users/user-service';
import { ClientService } from '../../../../services/client/client-service';
import { OnInit } from '@angular/core';
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

  users = signal<User[]>([]);
  clients = signal<Client[]>([]);

  ngOnInit(): void {
    this.loadUsers();
    this.loadClients();
  }

  loadUsers(): void {
    this.userService.getUserList().subscribe({
      next: (data: any) => {
        this.users.set(data);
      },
      error: (error) => console.error(error),
    });
  }

  loadClients(): void {
    this.clientService.getClientList().subscribe({
      next: (data: any) => {
        this.clients.set(data);
      },
      error: (error) => console.error(error),
    });
  }

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    due_date: ['', Validators.required],
    status: ['pending', Validators.required],
    assigned_user_id: [0, Validators.required],
    client_id: [0, Validators.required],
  });

  saveTask() {
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

    this.taskService.createTask(taskData).subscribe({
      next: () => {
        this.saved.emit();
        this.form.reset();
        this.isCreating.set(false);
      },
      error: (error) => {
        console.error(error);
        this.error.emit('Error al crear la tarea');
        this.isCreating.set(false);
      },
    });
  }

  onCancel(): void {
    this.canceled.emit();
  }
}