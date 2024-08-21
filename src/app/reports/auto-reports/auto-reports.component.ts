import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsService } from 'src/app/common/services/constants.service';
import { autoReportFilter } from './options';

@Component({
  selector: 'app-auto-reports',
  templateUrl: './auto-reports.component.html',
  styleUrls: ['./auto-reports.component.scss']
})
export class AutoReportsComponent implements OnInit {

  formItems: any = autoReportFilter;
  url: string = "api/v1/downloads/custom/"
  extra_fields: any
  originalInstance: any
  formGroupOrder = [
    ['title', 'custom_report_name'],
    ['description'],
    ['start_date', 'end_date', 'list_size'],
  ]
  instance: any;

  constructor(private route: ActivatedRoute, private router: Router, public commonService: ConstantsService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        const instance = this.router.getCurrentNavigation().extras.state;
        if (instance.hasOwnProperty("id")) {
          this.instance = instance
        }
      }
    })
  }
  preSaveDataFunction(data) {
    data.name = data.title
    return data
  }

  ngOnInit(): void {
  }

  onValidatedData(data: any) {
    console.log(data)
  }

  async onPostedData(data) {
    return this.router.navigate(['/reports/downloads']);
  }

}
