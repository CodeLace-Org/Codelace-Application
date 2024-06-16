import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { SignupComponent } from './signup/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    StudentComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatFormFieldModule
  ]
})
export class StudentModule { }
