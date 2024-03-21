import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(
    private _http: HttpClient,

  ){}

  ngOnInit(): void {
    this.loadTasks()
  }

  getTasks(): Observable<any[]> {
    return this._http.get<any[]>('http://localhost:3000/tasks');
  }

  loadTasks(): void {
    this.getTasks().subscribe((res: any[])=>{
      console.log(res)
    });
  }
}

