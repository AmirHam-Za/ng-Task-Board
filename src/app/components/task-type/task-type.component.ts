import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'app-task-type',
  templateUrl: './task-type.component.html',
  styleUrl: './task-type.component.css'
})
export class TaskTypeComponent {
  @Input() tasks: Task[] = [];
  @Input() color: string = '';
  @Input() title: string  = '';
  @Input() bgColor: string  = '';

  currentItem: Task | undefined

  @Output() emitCurrentItem: EventEmitter<Task> = new EventEmitter<Task>();

  receiveCurrentItem(event: Task) {
    this.currentItem = event

    this.emitCurrentItem.emit(this.currentItem);
  }
}

