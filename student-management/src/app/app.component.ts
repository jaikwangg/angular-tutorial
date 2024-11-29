import { Component } from '@angular/core';
import { StudentListComponent } from './components/student-list/student-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StudentListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'student-management';
}