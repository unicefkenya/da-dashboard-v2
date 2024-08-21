import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ImportRoutes } from './imports.routing';
import { CleaningComponent } from './cleaning/cleaning.component';
import { SharedModule } from '../shared/shared.module';
import { AddImportComponent } from './add-import/add-import.component';
import { ImportHelpComponent } from './import-help/import-help.component';
@NgModule({
  declarations: [CleaningComponent, AddImportComponent, ImportHelpComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ImportRoutes),
    SharedModule,
    // MatDialogModule
  ]
})
export class ImportsModule { }
