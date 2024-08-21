import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportFilterComponent } from './report-filter.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    // MyformModule,
    MatIconModule
  ],
  declarations: [ReportFilterComponent],
  exports: [
    ReportFilterComponent
  ]
})
export class ReportFilterModule { }
