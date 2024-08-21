import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TeachersComponent } from './teachers.component';
import { SharedModule } from '../../shared/shared.module';
import { TeachersRoutes } from './teachers.routing';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AddTeacherComponent } from '../add-teacher/add-teacher.component';
import { AddTeacherMyformComponent } from './add-teacher-myform/add-teacher-myform.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TeachersRoutes),
    SharedModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // MyformModule,
    // TablesModule
  ],
  declarations: [
    TeachersComponent,
    ResetPasswordComponent,
    AddTeacherComponent,
    AddTeacherMyformComponent
  ]
})
export class TeachersModule { }
