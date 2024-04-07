import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../interfaces/task.interface';
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
  isPopupOpen: boolean = false
  popup :string = 'popupOpen'

  receiveCurrentItem(event: Task) {
    this.currentItem = event
    this.emitCurrentItem.emit(this.currentItem);
  }

   openTaskAddPopup() {
    this.isPopupOpen = true;
    console.log(this.isPopupOpen);
  }
}

