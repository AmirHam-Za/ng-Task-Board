import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../interfaces/task.interface';

@Component({
  selector: 'app-task-type',
  templateUrl: './task-type.component.html',
  styleUrl: './task-type.component.css'
})
export class TaskTypeComponent {
  @Input() tasks: Task[] = [];
  @Input() color: string = '';
  @Input() title: string  = '';

  taskData: Task | undefined

  @Output() sendDataToParent: EventEmitter<Task> = new EventEmitter<Task>();

  // TODO:make more dynamic by creating box color object
  taskBoxColor(): string {
    return this.color === 'boxColor1' ? 'bg-indigo-200' :
           this.color === 'boxColor2' ? 'bg-red-200' :
           this.color === 'boxColor3' ? 'bg-teal-300' :
           this.color === 'boxColor4' ? 'bg-yellow-200' : 'bg-white';
  }

  receiveTaskDataFromChild(taskData: Task) {
    this.taskData = taskData
    this.sendDataToParent.emit(this.taskData);
  }
}

