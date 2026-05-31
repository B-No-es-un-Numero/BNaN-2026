import { CommonModule } from '@angular/common';
import { Component, inject, signal, OnInit } from '@angular/core';
import { Modal } from '../../../../shared/modal/modal';
import { FormsModule } from '@angular/forms';
import { Toast } from '../../../../shared/toast/toast/toast';

import { TaskService } from '../../../../services/task/task-service';
import { Task } from '../../../../model/task.model';
import { TasksForm } from '../tasks-form/tasks-form';

@Component({
  selector: 'app-tasks-view',
  imports: [
    CommonModule,
    Modal,
    FormsModule,
    Toast,
    TasksForm
  ],
  templateUrl: './tasks-view.html',
})
export class TasksView implements OnInit {

  private taskService = inject(TaskService);

  tasks = signal<Task[]>([]);

  isTaskModalOpen = signal(false);
  selectedTaskId = signal<number | null>(null);

  isDeleteModalOpen = signal(false);
  taskToDeleteId = signal<number | null>(null);

  isViewModalOpen = signal(false);
  selectedTask = signal<Task | null>(null);

  toasMessage = signal('');
  toasType = signal<'success' | 'error'>('success');
  toastOpen = signal(false);

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data: Task[]) => {
        this.tasks.set(data);
      },
      error: (error) => console.error(error),
    });
  }

  newTask(): void {
    this.selectedTaskId.set(null);
    this.isTaskModalOpen.set(true);
  }

  editTask(task: Task): void {
    this.selectedTaskId.set(task.id);
    this.isTaskModalOpen.set(true);
  }

  closeTaskModal(): void {
    this.isTaskModalOpen.set(false);
    this.selectedTaskId.set(null);
  }

  handleTaskSaved(): void {
    const wasEdited = this.selectedTaskId() !== null;

    this.closeTaskModal();

    this.showToast(
      wasEdited
        ? 'Tarea actualizada exitosamente'
        : 'Tarea creada exitosamente',
      'success'
    );

    this.loadTasks();
  }

  handleTaskError(message: string): void {
    this.showToast(message, 'error');
  }

  onSearch(event: Event) {
  console.log((event.target as HTMLInputElement).value);

  this.taskService.getTasks().subscribe({
    next: (data: Task[]) => {
      this.tasks.set(data);
    },
    error: (error: any) => console.error(error),
  });
}

  confirmDeleteTask(id: number): void {
    this.taskToDeleteId.set(id);
    this.isDeleteModalOpen.set(true);
  }

  deleteTask(): void {
    const id = this.taskToDeleteId();

    if (id === null) return;

    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks.update(tasks =>
          tasks.filter(task => task.id !== id)
        );

        this.showToast(
          'Tarea eliminada exitosamente',
          'success'
        );

        this.closeDeleteModal();
      },
      error: (error) => {
        console.error(error);

        this.showToast(
          'Error al eliminar tarea',
          'error'
        );
      },
    });
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen.set(false);
    this.taskToDeleteId.set(null);
  }

  viewTask(task: Task): void {
    this.selectedTask.set(task);
    this.isViewModalOpen.set(true);
  }

  closeViewModal(): void {
    this.isViewModalOpen.set(false);
    this.selectedTask.set(null);
  }

  closeModals(): void {
    this.closeTaskModal();
    this.closeDeleteModal();
    this.closeViewModal();
  }

  showToast(
    message: string,
    type: 'success' | 'error'
  ): void {
    this.toasMessage.set(message);
    this.toasType.set(type);
    this.toastOpen.set(true);

    setTimeout(() => {
      this.toastOpen.set(false);
    }, 4000);
  }
}