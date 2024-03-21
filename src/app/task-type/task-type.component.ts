import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-type',
  templateUrl: './task-type.component.html',
  styleUrl: './task-type.component.css'
})
export class TaskTypeComponent {
  @Input() tasks: any[] = [];
  @Input() color: string = '';
  @Input() title: string = '';

  taskBoxColor(): string {
    return this.color === 'boxColor1' ? 'bg-indigo-200' :
           this.color === 'boxColor2' ? 'bg-red-200' :
           this.color === 'boxColor3' ? 'bg-teal-300' :
           this.color === 'boxColor4' ? 'bg-yellow-200' : 'bg-white';
  }

  taskBoxTitle() {
    return this.title === 'title1' ? 'IDEAS' :
           this.title === 'title2' ? 'RESEARCH' :
           this.title === 'title3' ? 'TODO' :
           this.title === 'title4' ? 'DONE' : 'TITLE';
  }
}
