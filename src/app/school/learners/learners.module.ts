import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { LearnersRoutes } from './learners.routing';
import { AddLearnerComponent } from './add-learner/add-learner.component';
import { ViewLearnerComponent } from './view-learner/view-learner.component';
import { MoveLearnerComponent } from './move-learner/move-learner.component';
import { PromoteLearnerComponent } from './promote-learner/promote-learner.component';
import { IndividualComponent } from '../students/individual/individual.component';
import { DropoutsComponent } from '../students/dropouts/dropouts.component';
import { PromoteToDialogComponent, PromoteStudentsComponent } from '../students/promote-students/promote-students.component';
import { MoveStudentsComponent } from '../students/move-students/move-students.component';
import { StudentsComponent } from '../students/students.component';
import { AddStudentComponent } from '../students/add-student/add-student.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LearnersRoutes),
    FileUploadModule,
    SharedModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // MatListModule,
    // MatDialogModule,
    // MyformModule,
    // TablesModule
  ],
  declarations: [
    AddLearnerComponent,
    ViewLearnerComponent,
    MoveLearnerComponent,
    PromoteLearnerComponent,
    IndividualComponent,
    DropoutsComponent,
    PromoteToDialogComponent,
    MoveStudentsComponent,
    PromoteStudentsComponent,
    StudentsComponent,
    AddStudentComponent
  ]
})
export class LearnersModule { }
