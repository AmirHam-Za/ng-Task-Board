import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task/task.service';
@Component({
  selector: 'app-task-type',
  templateUrl: './task-type.component.html',
  styleUrl: './task-type.component.css'
})

export class TaskTypeComponent {

  @Input() tasks: Task[] = [];
  @Input() title: string  = '';
  @Input() bgColor: string  = '';

  @Input() isAddTaskButton: boolean = false;

  @Output() emitCurrentItem: EventEmitter<Task> = new EventEmitter<Task>();

  currentItem: Task | undefined
  isPopupOpen:boolean = false
  newTask: Task = { id: '', taskName: '', status: '1' };
  successMessage: string = ''

  constructor(private _taskService: TaskService) { }

  receiveCurrentItem(event: Task) {
    this.currentItem = event
    this.emitCurrentItem.emit(this.currentItem);
  }

   toggleTaskAdd() {
    this.isPopupOpen = true;
    console.log(this.isPopupOpen);
  }

  closeTaskPopup() {
    this.isPopupOpen = false;
  }

// TODO: refactor with form validation
  addTask(){
    this._taskService.addTaskAsync(this.newTask).subscribe(() => {
      this.newTask.taskName = '';
      this.successMessage = 'Task added successfully';
    });
  }

}

