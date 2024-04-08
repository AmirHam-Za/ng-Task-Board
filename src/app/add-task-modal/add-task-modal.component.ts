import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task/task.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrl: './add-task-modal.component.css'
})

export class AddTaskModalComponent {

  @Output() isPopupOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _isPopupOpen = false;

  @Input()
  get isPopupOpen(): boolean {
    return this._isPopupOpen;
  }

  set isPopupOpen(value: boolean) {
    this._isPopupOpen = value;
    this.isPopupOpenChange.emit(value);
  }

  @Input() popup: any;

  newTask: Task = { id: '', taskName: '', status: '1' };
  successMessage :string = '';

  constructor(
    private _taskService: TaskService,

  ) { }

  closePopup() {
    this.isPopupOpen = false;
  }

  addTaskForm = new FormGroup({
    taskName: new FormControl('', [
      Validators.required,
    ])
  });

  get taskName(){
    return this.addTaskForm.get('taskName')
  }

  addTask(){

    const newTaskName = this.newTask.taskName;

    if (newTaskName != null) {
      this._taskService.addTaskAsync(this.newTask).subscribe({

        next: () => {
          this.successMessage = 'Task added successfully!';
          this.newTask.taskName = '';
        },

        error: (error: HttpErrorResponse) => {
          if (error.status === 404) {
            console.log(`Add Task Error occurred: ${error.statusText}-${error.status}`);
          }
        }

      });

    } else {
      console.error('Task not found');
    }
  }

}
