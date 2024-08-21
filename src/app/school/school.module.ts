import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddSchoolComponent } from './add-school/add-school.component';
import { SchoolRoutes } from './school.routing';
import { SharedModule } from '../shared/shared.module';
import { ViewSchoolsComponent } from './view-schools/view-schools.component';
import { SchoolAttendanceComponent } from './school-attendance/school-attendance.component';
import { AddSchoolMyformComponent } from './add-school-myform/add-school-myform.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SchoolRoutes),
    FileUploadModule,
    SharedModule,
    // MatCardModule,
    // MatDatepickerModule,
    // MatNativeDateModule
  ],
  declarations: [
    AddSchoolComponent, ViewSchoolsComponent, SchoolAttendanceComponent, AddSchoolMyformComponent,
  ]
})
export class SchoolModule { }
