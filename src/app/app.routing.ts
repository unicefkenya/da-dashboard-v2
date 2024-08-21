import { Routes } from '@angular/router';

import { AdminLayoutComponent, AuthLayoutComponent } from './core';
import { AuthGuard } from './core/guards/auth.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'v2',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./dashboard-v2/dashboard-v2.module').then(m => m.DashboardV2Module),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [{
      path: 'session',
      loadChildren: () => import('./session/session.module').then(m => m.SessionModule)
    }]
  },
  {
    path: '**',
    redirectTo: 'session/404'
  }];
