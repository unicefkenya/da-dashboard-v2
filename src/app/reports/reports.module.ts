import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgmCoreModule } from '@agm/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReportsRoutes } from './reports.routing';
import { MapsComponent } from './maps/maps.component';
import { ReportsComponent } from './reports.component';
import { ReportFilterModule } from '../shared/report-filter/report-filter.module';
import { StatsComponent } from './stats/stats.component';
import { DownloadsComponent } from './downloads/downloads.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EnrolmentComponent } from './enrolment/enrolment.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AbsenceComponent } from './absence/absence.component';
import { DeleteComponent } from './delete/delete.component';
import { AutoReportsComponent } from './auto-reports/auto-reports.component';

@NgModule({
  imports: [
    CommonModule,
    // MatCardModule,
    // MatToolbarModule,
    // MatTabsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBNezLRlMDDEewnDoyK0QmNwFKWtBva8tg'
    }),
    SharedModule,
    // TablesModule,
    // MyformModule,

    ReportFilterModule,
    RouterModule.forChild(ReportsRoutes)
  ],
  declarations: [ReportsComponent, StatsComponent, DownloadsComponent, MapsComponent, ReportsComponent, EnrolmentComponent, AttendanceComponent, AbsenceComponent, DeleteComponent, AutoReportsComponent]
})
export class ReportsModule { }