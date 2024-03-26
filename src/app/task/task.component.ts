import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() tasks: any[] = [];

  currentItem: any;

  @Output() sendDataToMiddle: EventEmitter<any> = new EventEmitter<any>();

  onDragStart(task: any) {
    this.currentItem = task;
    this.sendDataToMiddle.emit(this.currentItem);
  }
}
