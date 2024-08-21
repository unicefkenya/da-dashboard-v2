import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesComponent } from './classes.component';
import { RouterModule } from '@angular/router';
import { ClassesRoutes } from './classes.routing';
import { ViewClassesComponent } from '../view-classes/view-classes.component';
import { FileUploadModule } from 'ng2-file-upload';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddClassMyformComponent } from './add-class-myform/add-class-myform.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ClassesRoutes),
    FileUploadModule,
    SharedModule,
    // MyformModule, TablesModule
  ],
  declarations: [ClassesComponent, ViewClassesComponent, AddClassMyformComponent]
})
export class ClassesModule { }
