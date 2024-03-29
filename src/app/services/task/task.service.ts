import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _http: HttpClient) { }

  getTasksAsync(): Observable<any[]> {
    return this._http.get<any[]>('http://localhost:3000/tasks');
  }

  updateTaskAsync(task: any): Observable<any> {
    const url = 'http://localhost:3000/tasks/' + task.id;

    return this._http.put<any>(url, task);
  }
}
