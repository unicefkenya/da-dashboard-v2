import { Routes } from '@angular/router';
import { AttendanceComponent } from './attendance/attendance.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { EnrolmentComponent } from './enrolment/enrolment.component';
import { MapsComponent } from './maps/maps.component';
import { StatsComponent } from './stats/stats.component';
import { AbsenceComponent } from './absence/absence.component';
import { DeleteComponent } from './delete/delete.component';
import { AutoReportsComponent } from './auto-reports/auto-reports.component';

export const ReportsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'maps',
        component: MapsComponent
      },
      {
        path: 'stats',
        component: StatsComponent
      },
      {
        path: 'downloads',
        component: DownloadsComponent
      },
      {
        path: 'enrolment',
        component: EnrolmentComponent
      },
      {
        path: 'attendance',
        component: AttendanceComponent
      },
      {
        path: 'absence',
        component: AbsenceComponent
      },
      {
        path: 'delete',
        component: DeleteComponent
      },
      {
        path: 'auto',
        component: AutoReportsComponent
      },
    ]
  },
];
