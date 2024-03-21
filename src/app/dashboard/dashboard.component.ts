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
  
}

