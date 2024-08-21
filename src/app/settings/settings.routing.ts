import { Routes } from '@angular/router';
import { AddSystemUsersComponent } from '../system-users/add-system-users/add-system-users.component';
import { SystemUsersComponent } from '../system-users/system-users.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';

export const SettingsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'change-password',
        component: ChangePasswordComponent
      }, {
        path: 'profile',
        component: ProfileComponent
      }, {
        path: 'system-users',
        component: SystemUsersComponent
      }, {
        path: 'add-system-users',
        component: AddSystemUsersComponent
      }

    ]
  },
];
