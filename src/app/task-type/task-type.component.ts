import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-type',
  templateUrl: './task-type.component.html',
  styleUrl: './task-type.component.css'
})
export class TaskTypeComponent {
  @Input() tasks: any[] = [];

}
