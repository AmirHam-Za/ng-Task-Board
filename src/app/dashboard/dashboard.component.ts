import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  tasks: any[] = [];

  constructor(
    private _http: HttpClient,

  ) { }

  ngOnInit(): void {
    this.loadTasks()
  }

  // TODO:create service to handle api and other functions related to the task board
  // TODO:create interface to handle data conveniently
  getTasks(): Observable<any[]> {
    return this._http.get<any[]>('http://localhost:3000/tasks');
  }

  loadTasks(): void {
    this.getTasks().subscribe({
      next: (res: any[]) => {
        console.log(res);
        this.tasks = res;
      },
      error: (error: any) => {
        if (error.status === 404) {
          console.log(`Error occurred: ${error.statusText}-${error.status}`);
        }
      }
    });
  }

  getTasksByStatus(status: string): any[] {
    return this.tasks.filter(task => task.status === status);
  }
}

