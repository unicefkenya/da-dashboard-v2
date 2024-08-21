import { Routes } from '@angular/router';
import { TeachersComponent } from './teachers.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AddTeacherComponent } from '../add-teacher/add-teacher.component';
import { NotAdminGuard } from 'src/app/core/guards/auth.guard';
import { AddTeacherMyformComponent } from './add-teacher-myform/add-teacher-myform.component';

export const TeachersRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'view-teachers',
        component: TeachersComponent
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent
      },
      {
        path: 'add-teachers',
        component: AddTeacherMyformComponent,
        //  canActivate: [NotAdminGuard]     // to be removed on face 3
      }
    ]
  }
];
