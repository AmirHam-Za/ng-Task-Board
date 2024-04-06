import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  API_ENDPOINT = 'http://localhost:3000'

  constructor(private _http: HttpClient) {}

  getTasksAsync(): Observable<Task[]> {

    return this._http.get<Task[]>(`${this.API_ENDPOINT}/tasks`);
  }

  updateTaskAsync(task: Task): Observable<Task> {

    return this._http.put<Task>(`${this.API_ENDPOINT}/tasks/${task.id}`, task);
  }

  // TODO: id need to be type "number"
  private generateTaskUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
  
  addTaskAsync(task: Task): Observable<Task> {
    task.id = this.generateTaskUniqueId()
    return this._http.post<Task>(`${this.API_ENDPOINT}/tasks`, task);

  }
}
