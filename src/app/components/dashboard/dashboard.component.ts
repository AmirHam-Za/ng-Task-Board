import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TaskService } from '@services/task/task.service';
import { Task } from '@interfaces/task.interface';
import { TITLE_OBJECTS } from '@constant/task-type';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})

export class DashboardComponent {
  tasks: Task[] = [];
  title: any;
  bgColor: any;
  currentItem: Task | undefined;

  ideas: Task[] = [];
  research: Task[] = [];
  todo: Task[] = [];
  done: Task[] = [];

  titleObjects = TITLE_OBJECTS;

  constructor(private _taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
    this.title = this.taskBoxTitleObjects();
    this.bgColor = this.taskBgcolorObjects();
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
    return this.titleObjects;
  }

  taskBgcolorObjects() {
    const colorObjects = [
      { id: 1, bgColor: 'bg-indigo-200' },
      { id: 2, bgColor: 'bg-red-200' },
      { id: 3, bgColor: 'bg-teal-300' },
      { id: 4, bgColor: 'bg-yellow-200' },
    ];
    return colorObjects;
  }

  receiveCurrentItem(taskData: Task) {
    this.currentItem = taskData;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  drop(event: CdkDragDrop<Task[]>, status: string) {
    const record = this.tasks.find((m) => m.id == this.currentItem?.id);

    if (record) {
      record.status = status;
      this.updateTask();
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
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
