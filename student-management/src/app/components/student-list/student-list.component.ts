import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student';
import { StudentFormComponent } from '../student-form/student-form.component';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule, StudentFormComponent],
  template: `
    <div class="student-management">
      <h1>Student Management</h1>
      
      <div class="input-group">
        <input type="text" placeholder="First Name" [(ngModel)]="newStudent.name" name="firstName">
        <input type="text" placeholder="Last Name" [(ngModel)]="newStudent.lastName" name="lastName">
        <button (click)="addNewStudent()">Add Student</button>
      </div>

      <h2>Student List</h2>
      <ul class="student-list">
        @for (student of students; track student.id) {
          <li>
            <span>{{student.name}} {{student.lastName}}</span>
            <div class="button-group">
              <button (click)="editStudent(student)">Edit</button>
              <button (click)="deleteStudent(student.id!)">Delete</button>
            </div>
          </li>
        }
      </ul>

      @if (showForm) {
        <app-student-form 
          [studentToEdit]="selectedStudent"
          (formSubmit)="onFormSubmit($event)"
          (formCancel)="onFormCancel()">
        </app-student-form>
      }
    </div>
  `,
  styles: [`
    .student-management {
      max-width: 800px;
      margin: 0 auto;
    }

    h1 {
      margin-bottom: 20px;
    }

    h2 {
      margin-top: 30px;
      margin-bottom: 15px;
    }

    .input-group {
      margin-bottom: 20px;
    }

    .input-group input {
      margin-right: 10px;
    }

    .student-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .student-list li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }

    .button-group {
      display: flex;
      gap: 5px;
    }
  `]
})

export class StudentListComponent implements OnInit {
  students: Student[] = [];
  showForm = false;
  selectedStudent: Student | null = null;
  newStudent: Student = {
    name: '',
    lastName: ''
  };

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(
      students => this.students = students
    );
  }

  addNewStudent(): void {
    if (this.newStudent.name && this.newStudent.lastName) {
      this.studentService.addStudent({ ...this.newStudent });
      // Reset form
      this.newStudent = {
        name: '',
        lastName: ''
      };
    }
  }

  showAddForm(): void {
    this.selectedStudent = null;
    this.showForm = true;
  }

  editStudent(student: Student): void {
    this.selectedStudent = student;
    this.showForm = true;
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id);
    }
  }

  onFormSubmit(student: Student): void {
    if (this.selectedStudent) {
      this.studentService.updateStudent(student);
    } else {
      this.studentService.addStudent(student);
    }
    this.showForm = false;
    this.selectedStudent = null;
  }

  onFormCancel(): void {
    this.showForm = false;
    this.selectedStudent = null;
  }
}