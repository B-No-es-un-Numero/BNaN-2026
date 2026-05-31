import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
    private readonly baseUrl = `${environment.apiUrl}/tareas/`;
    private http = inject(HttpClient);
  
  getTasks(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  
  getTaskById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}/`);
  }


  createTask(taskData: any): Observable<any> {
    return this.http.post(this.baseUrl, taskData);
  }

  
  updateTask(id: number, taskData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${id}/`, taskData);
  }

  
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}/`);
  }
}
