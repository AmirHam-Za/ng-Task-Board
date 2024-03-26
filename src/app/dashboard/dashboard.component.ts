import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  tasks: any[] = [];
  title: any = [];
  currentItem: any;
  taskData: any[] = [];

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    this.loadTasks();
    this.title = this.taskBoxTitleObjects();
    console.log(this.title);
  }

  // TODO:create service to handle api an other functions related to the dashboard
  // TODO:create interface to handle data
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
      },
    });
  }

  getTasksByStatus(status: string): any[] {
    return this.tasks.filter((task) => task.status === status);
  }

  taskBoxTitleObjects() {
    const titleObjects = [
      { id: 1, title: 'IDEAS' },
      { id: 2, title: 'RESEARCH' },
      { id: 3, title: 'TODO' },
      { id: 4, title: 'DONE' },
    ];
    return titleObjects;
  }

  receiveTaskDataFromChild(taskData: any) {
    this.currentItem = taskData;
    console.log(
      'currentItem in dashboard from taskType Component',
      this.taskData
    );
  }

  onDragOver(event: any) {
    console.log('onDragOver');
    event.preventDefault();
  }

  onDrop(event: any, status: string) {
    event.preventDefault();

    const record = this.tasks.find((m) => m.id == this.currentItem.id);

    if (record !== undefined) {
      record.status = status;
      this.updateTask();
    }
  }

  updateTask(): void {
    const records = this.tasks.find((m) => m.id == this.currentItem.id);
    this.updateTaskAsync(records).subscribe(() => {});
  }

  // TODO: manage the api in a service.
  updateTaskAsync(task: any): Observable<any> {
    const url = 'http://localhost:3000/tasks/' + task.id;

    return this._http.put<any>(url, task);
  }
}
