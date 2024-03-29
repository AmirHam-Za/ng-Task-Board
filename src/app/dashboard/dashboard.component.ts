import { Component } from '@angular/core';
import { TaskService } from '../services/task/task.service';
import { Task } from '../interfaces/task.interface';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})

export class DashboardComponent {
  tasks :Task[] = [];
  title :any;
  currentItem :Task | undefined;


  constructor(private _taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
    this.title = this.taskBoxTitleObjects();
  }

  loadTasks(): void {
    this._taskService.getTasksAsync().subscribe({
      next: (res: Task[]) => {
        this.tasks = res;
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          console.log(`Error occurred: ${error.statusText}-${error.status}`);
        }
      }
    })
  }

  getTasksByStatus(status: string): Task[] {
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

  receiveCurrentItem(taskData: Task) {
    this.currentItem = taskData;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent, status: string) {
    event.preventDefault();
    const record = this.tasks.find((m) => m.id == this.currentItem?.id);

    if (record !== undefined) {
      record.status = status;
      this.updateTask();
    }
  }

  updateTask(): void {
    const records = this.tasks.find((m) => m.id == this.currentItem?.id);

    if (records !== undefined) {
        this._taskService.updateTaskAsync(records).subscribe({
          error: (error: HttpErrorResponse) => {
            if (error.status === 404) {
              console.log(`Update Error occurred: ${error.statusText}-${error.status}`);
            }
          }
        });
    } else {
        console.error('Task not found');
    }
}

}
