import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { NotAdminGuard, AdminGuard, AuthGuard } from '../core/guards/auth.guard';

export const DashboardRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('../dashboard-v2/dashboard-v2.module').then(m => m.DashboardV2Module),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    children: [
      {
        path: 'schools',
        loadChildren: () => import('../school/school.module').then(m => m.SchoolModule),
        // canActivate: [AdminGuard]
      },
      {
        path: 'students',
        loadChildren: () => import('../school/learners/learners.module').then(m => m.LearnersModule)
      },
      {
        path: 'teachers',
        loadChildren: () => import('../school/teachers/teachers.module').then(m => m.TeachersModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'classes',
        loadChildren: () => import('../school/classes/classes.module').then(m => m.ClassesModule),
        // canActivate: [NotAdminGuard]
      },
      {
        path: 'reports',
        loadChildren: () => import('../reports/reports.module').then(m => m.ReportsModule)
      },
      {
        path: 'imports',
        loadChildren: () => import('../imports/imports.module').then(m => m.ImportsModule)
      },
    ]
  }
];

