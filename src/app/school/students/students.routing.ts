import { Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { DropoutsComponent } from './dropouts/dropouts.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { IndividualComponent } from './individual/individual.component';
import { MoveStudentsComponent } from './move-students/move-students.component';
import { PromoteStudentsComponent } from './promote-students/promote-students.component';
import { NotAdminGuard } from 'src/app/core/guards/auth.guard';

export const StudentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'view-students',
        component: StudentsComponent
      },
      {
        path: 'view-students/deactivated',
        component: DropoutsComponent
      },
      {
        path: 'add-student',
        component: AddStudentComponent,
        canActivate: [NotAdminGuard]
      },
      {
        path: 'details',
        component: IndividualComponent
      },
      {
        path: 'move-students',
        component: MoveStudentsComponent,
        canActivate: [NotAdminGuard]
      },
      {
        path: 'promote-students',
        component: PromoteStudentsComponent,
        canActivate: [NotAdminGuard]
      }
    ]
  }
];
