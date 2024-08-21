import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../school.service';
import { SharedService } from 'src/app/shared/shared.service';
import * as moment from 'moment'
import { Router } from '@angular/router';

@Component({
  selector: 'app-dropouts',
  templateUrl: './dropouts.component.html',
  styleUrls: ['./dropouts.component.scss']
})
export class DropoutsComponent implements OnInit {
  currentPage = 'deactivated';
  students: any = [];
  temp_students: any;
  rows: any;
  temp: any;
  columns: any;
  total = 0;
  pageNumber = 0;
  pageNumberClicked: any;
  loader: boolean = false;
  fetchingData = false;
  stats_count = 0;

  constructor(private schoolService: SchoolService, private sharedService: SharedService, private route: Router) { }

  ngOnInit() {
    // this.getStudents(1);
  }

  headers = [
    'first_name',
    'last_name',
    'admission_no',
    'base_class',
    'school_name',
    'reason_description',
    'description'
  ]

  onLengthLoaded(res) {
    this.stats_count = res
  }

  getStudents(page) {
    this.loader = true;
    this.schoolService.getDropoutStudents(page).subscribe(res => {
      this.rows = res.results.map((student, index) => {
        (page > 1) ? student.num = (page * 100) + (index + 1) : student.num = index + 1;
        student.full_names = `${student.first_name} ${student.middle_name} ${student.last_name}`;
        student.stream_name = `${student.base_class}${student.stream_name}`;
        if (!student.gender) { student.gender = '_'; }
        return student;
      });

      this.total = res.count;
      this.columns = [
        { prop: 'num', name: '#' },
        { prop: 'full_names', name: 'NAME' },
        { prop: 'admission_no', name: 'ADMISSION NUMBER' },
        { prop: 'created', name: 'DEACTIVATION DATE' },
        { prop: 'dropout_reason', name: 'DEACTIVATION REASON' }
      ];

      this.loader = false;
    });
  }

  exportTriggerd(event) {
    this.route.navigate(['/reports/downloads']);
  }

  get exportButtonActive() {
    return !this.fetchingData && this.stats_count > 0
  }

}



