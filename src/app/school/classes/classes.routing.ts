import { Routes } from '@angular/router';
import { ViewClassesComponent } from '../view-classes/view-classes.component';
import { AddClassMyformComponent } from './add-class-myform/add-class-myform.component';

export const ClassesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'add-class',
        component: AddClassMyformComponent
      },
      {
        path: 'view-classes',
        component: ViewClassesComponent
      },
    ]
  }
];
