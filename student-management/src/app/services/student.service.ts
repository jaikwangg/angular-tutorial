import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [
    { id: 1, name: 'aa', lastName: 'bbbb' }
  ];
  
  private studentsSubject = new BehaviorSubject<Student[]>(this.students);

  getStudents(): Observable<Student[]> {
    return this.studentsSubject.asObservable();
  }

  addStudent(student: Student): void {
    const id = this.students.length + 1;
    this.students.push({ ...student, id });
    this.studentsSubject.next(this.students);
  }

  updateStudent(student: Student): void {
    const index = this.students.findIndex(s => s.id === student.id);
    if (index !== -1) {
      this.students[index] = student;
      this.studentsSubject.next(this.students);
    }
  }

  deleteStudent(id: number): void {
    this.students = this.students.filter(student => student.id !== id);
    this.studentsSubject.next(this.students);
  }
}