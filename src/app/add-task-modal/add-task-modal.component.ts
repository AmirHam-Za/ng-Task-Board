import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task/task.service';

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
    console.log('isPopupOpen in task ADD>',this.isPopupOpen);
  };


  addTask(){
    this._taskService.addTaskAsync(this.newTask).subscribe(() => {
      this.newTask.taskName = '';
      this.successMessage = 'Task added successfully';
    });

  }

}
