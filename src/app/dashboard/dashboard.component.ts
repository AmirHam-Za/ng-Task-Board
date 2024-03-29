import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TaskService } from '../services/task/task.service';

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

  constructor(private _taskService: TaskService, private _http: HttpClient) {}

  ngOnInit(): void {
    this.loadTasks();
    this.title = this.taskBoxTitleObjects();
    console.log(this.title);
  }

  // TODO:create interface to handle data

  loadTasks(): void {
    this._taskService.getTasksAsync().subscribe({
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
    this._taskService.updateTaskAsync(records).subscribe(() => {});
  }

}
