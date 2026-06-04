import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Task } from '../../model/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly baseUrl = `${environment.apiUrl}/tareas/`;
  private http = inject(HttpClient);

  getTasks(search?: string): Observable<Task[]> {
    const params = search ? `?search=${encodeURIComponent(search)}` : '';
    return this.http.get<Task[]>(`${this.baseUrl}${params}`);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}${id}/`);
  }

  createTask(taskData: any): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, taskData);
  }

  updateTask(id: number, taskData: any): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}${id}/`, taskData);
  }

  deleteTask(id: number, hard: boolean = false): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}/?hard=${hard}`);
  }
}
