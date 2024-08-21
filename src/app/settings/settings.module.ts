import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SettingsRoutes } from './settings.routing';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent, EditProfileDialogComponent } from './profile/profile.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SystemUsersComponent } from '../system-users/system-users.component';
import { AddSystemUsersComponent } from '../system-users/add-system-users/add-system-users.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    // MatDialogModule,
    // MatDatepickerModule,
    // MyformModule,
    // // TablesModule,
    // MatNativeDateModule,
    RouterModule.forChild(SettingsRoutes),
  ],
  declarations: [ChangePasswordComponent, AddSystemUsersComponent, SystemUsersComponent, ProfileComponent, EditProfileDialogComponent]
})
export class SettingsModule { }

