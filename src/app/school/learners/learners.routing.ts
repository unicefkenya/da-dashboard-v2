import { Routes } from '@angular/router';
import { NotAdminGuard } from 'src/app/core/guards/auth.guard';
import { DropoutsComponent } from '../students/dropouts/dropouts.component';
import { IndividualComponent } from '../students/individual/individual.component';
import { AddLearnerComponent } from './add-learner/add-learner.component';
import { MoveLearnerComponent } from './move-learner/move-learner.component';
import { PromoteLearnerComponent } from './promote-learner/promote-learner.component';
import { ViewLearnerComponent } from './view-learner/view-learner.component';

export const LearnersRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'view-students',
        component: ViewLearnerComponent
      },
      {
        path: 'view-students/deactivated',
        component: DropoutsComponent
      },
      {
        path: 'add-student',
        component: AddLearnerComponent,
       // canActivate: [NotAdminGuard]
      },
      {
        path: 'details',
        component: IndividualComponent
      },
      {
        path: 'move-students',
        component: MoveLearnerComponent,
       // canActivate: [NotAdminGuard]
      },
      {
        path: 'promote-students',
        component: PromoteLearnerComponent,
      //  canActivate: [NotAdminGuard]
      }
    ]
  }
];
