import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Student } from '../../models/student';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="edit-form">
      <h3>{{studentToEdit ? 'Edit' : 'Add'}} Student</h3>
      <form [formGroup]="studentForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <input formControlName="name" type="text" placeholder="First Name">
        </div>
        <div class="form-group">
          <input formControlName="lastName" type="text" placeholder="Last Name">
        </div>
        <div class="button-group">
          <button type="submit" [disabled]="!studentForm.valid">
            {{studentToEdit ? 'Update' : 'Add'}} Student
          </button>
          <button type="button" (click)="cancel()">Cancel</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .edit-form {
      margin-top: 20px;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 4px;
    }

    h3 {
      margin-top: 0;
      margin-bottom: 15px;
    }

    .form-group {
      margin-bottom: 10px;
    }

    .button-group {
      margin-top: 15px;
      display: flex;
      gap: 5px;
    }
  `]
})

export class StudentFormComponent implements OnInit {
  @Input() studentToEdit: Student | null = null;
  @Output() formSubmit = new EventEmitter<Student>();
  @Output() formCancel = new EventEmitter<void>();

  studentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.studentToEdit) {
      this.studentForm.patchValue(this.studentToEdit);
    }
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      const student: Student = {
        ...this.studentForm.value,
        id: this.studentToEdit?.id
      };
      this.formSubmit.emit(student);
    }
  }

  cancel(): void {
    this.formCancel.emit();
  }
}