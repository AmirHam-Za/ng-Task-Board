import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../interfaces/task.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {

  @Input() tasks: Task[] = [];

  currentItem: Task | undefined;

  @Output() emitCurrentItem: EventEmitter<Task> = new EventEmitter<Task>();

  onDragStart(item: Task) {
    this.currentItem = item;
    this.emitCurrentItem.emit(this.currentItem);
  }
}
