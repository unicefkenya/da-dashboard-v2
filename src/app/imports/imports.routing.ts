import { Routes } from '@angular/router';
import { CleaningComponent } from './cleaning/cleaning.component';

export const ImportRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'clean',
                component: CleaningComponent
            },
            {
                path: 'import',
                component: CleaningComponent
            },
        ]
    }
];