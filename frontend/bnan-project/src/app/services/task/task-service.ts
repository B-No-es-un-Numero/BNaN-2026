import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
    private http = inject(HttpClient);

  private apiUrl = 'http://127.0.0.1:8000/api/tasks/';

  
  getTasks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  
  getTaskById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}/`);
  }


  createTask(taskData: any): Observable<any> {
    return this.http.post(this.apiUrl, taskData);
  }

  
  updateTask(id: string, taskData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}/`, taskData);
  }

  
  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
