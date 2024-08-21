import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from 'src/app/dashboard/dashboard.service';
import moment from 'moment';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SchoolService } from '../school.service';
@Component({
  selector: 'app-school-attendance',
  templateUrl: './school-attendance.component.html',
  styleUrls: ['./school-attendance.component.scss']
})
export class SchoolAttendanceComponent implements OnInit {
  att_distribution: any;
  att_resolver: boolean;
  att_m_distribution: any;
  att_m_resolver: boolean;
  att_d_distribution: any;
  att_d_resolver: boolean;
  no_m_attendance: boolean;
  no_d_attendance: boolean;
  no_y_attendance: boolean;
  public bar = 'bar';
  public doughnut = 'doughnut';
  barConfig: any;
  doughnutConfig: any;
  schoolId: any;
  school_name = null;
  searchChangeObserver: any;
  search_name = '';
  schools: any;
  searching_school = false;
  pastYears: any = [];
  selectedYear: any;
  monthStartDate: any;
  selectedDate: any;
  dailyEndDate: any;
  monthlyEndDate: any;
  selectedMonth: any;

  constructor(public activatedRoute: ActivatedRoute, public dashboardService: DashboardService,
    public schoolService: SchoolService) {

    const currentYear = new Date().getFullYear();
    for (let start = 2019; start <= currentYear; start++) { this.pastYears.push(start); }
  }

  ngOnInit() {

    this.selectedYear = new Date().getFullYear();
    this.monthStartDate = moment(moment().subtract(4, 'months')).startOf('month').format('YYYY-MM-DD');
    this.monthlyEndDate = moment().endOf('month').format('YYYY-MM-DD');
    this.selectedMonth = moment().format('YYYY-MM-DD');
    this.selectedDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
    this.dailyEndDate = moment().format('YYYY-MM-DD');
    this.activatedRoute.queryParams
      .subscribe(params => {
        if (Object.entries(params).length > 1) {
          this.schoolId = params.school;
          this.school_name = params.school_name;
          this.getDailyAttendance();
          this.getMonthlyAttendance();
          this.getYearlyAttendance();
        } else {
          this.barConfig = true;
          this.doughnutConfig = true;
          this.schoolId = true;
          // console.log('seeeen')
        }
      });
    this.chartConfigs();
  }

  selectedYearChange(value) {
    this.selectedYear = value;
    this.getYearlyAttendance();
    this.getMonthlyAttendance();
  }

  selectedmonthChange(value) {
    this.monthStartDate = moment(moment(value).subtract(4, 'months')).startOf('month').format('YYYY-MM-DD');
    this.monthlyEndDate = moment(value).endOf('month').format('YYYY-MM-DD');
    this.selectedMonth = moment(value).format('YYYY-MM-DD');
    this.getMonthlyAttendance();
  }

  selectedDateChange(value) {
    this.dailyEndDate = moment(value).format('YYYY-MM-DD');
    this.selectedDate = moment(value).subtract(7, 'days').format('YYYY-MM-DD');
    this.getDailyAttendance();
  }

  getYearlyAttendance() {
    const query = `yearly?year=${this.selectedYear}&school=${this.schoolId}`;

    this.dashboardService.getAttendance(query).subscribe(res => {
      if (res.results.length < 1) { this.att_resolver = true; return this.no_y_attendance = true; }
      const { present_males, absent_males, present_females, absent_females } = res.results[0];
      this.no_y_attendance = false;
      this.att_resolver = true;
      this.att_distribution = {
        data: Array(present_males, absent_males, present_females, absent_females),
        labels: ['Boys present', 'Boys Absent', 'Girls present', 'Girls absent']
      };
    });
  }

  getMonthlyAttendance() {
    this.no_m_attendance = true;
    const query = `monthly?start_date=${this.monthStartDate}&end_date=${this.monthlyEndDate}&school=${this.schoolId}`;
    this.dashboardService.getAttendance(query).subscribe(res => {
      if (res.results.length < 1) { return this.att_m_resolver = false; }
      const labels = [];
      const presents = [];
      const absents = [];
      res.results.map(result => {
        labels.push(moment(result.value).format('MMM'));
        presents.push(result.present);
        absents.push(result.absent);
      });
      this.no_m_attendance = false;
      this.att_m_distribution = this.distribution(presents, absents, labels, true);
      this.att_m_resolver = true;
    });

  }

  getDailyAttendance() {
    this.no_d_attendance = true;
    const labels = [];
    const presents = [];
    const absents = [];
    const query = `daily?start_date=${this.selectedDate}&end_date=${this.dailyEndDate}&school=${this.schoolId}`;

    this.dashboardService.getAttendance(query).subscribe(res => {
      if (res.results.length < 1) { return this.att_d_resolver = true; }
      res.results.map(result => {
        labels.push(moment(result.value).format('DD-MM-YY'));
        presents.push(result.present_males + result.present_females);
        absents.push(result.absent_males + result.absent_females);
      });
      this.att_d_distribution = this.distribution(presents, absents, labels, false);
      this.no_d_attendance = false;
      this.att_d_resolver = true;
    });

  }

  distribution(presents, absents, labels, percentage) {
    let label_a = ''; let label_b = '';
    if (percentage) {
      label_a = '% Present students';
      label_b = '% Absent students';
    } else {
      label_a = 'Present students';
      label_b = 'Absent students';
    }
    return {
      series: {
        series_a: presents,
        series_b: absents,
        labels: {
          label_a,
          label_b
        }
      },
      labels
    };
  }
  chartConfigs() {
    // doughnut chart config
    this.doughnutConfig = {
      colors: ['#2096f3', '#929292', '#F5D908', '#e91d63']
    };

    // bar chart config
    this.barConfig = {
      colors: {
        colors: [
          {
            backgroundColor: 'rgb(32,150,243, 0.7)',
            borderColor: 'rgb(32,150,243, 0.7)',
            pointBackgroundColor: 'rgb(32,150,243, 0.7)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(32,150,243, 0.7)'
          },
          {

            backgroundColor: 'rgb(146,146,146,0.6)',
            borderColor: 'rgb(146,146,146,0.6)',
            pointBackgroundColor: 'rgba(225,10,24,0.2)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(225,10,24,0.2)'
          }
        ],
        xColor: 'rgba(0,0,0,0.02)',
        xZeroLineColor: 'rgba(0,0,0,0.02)',
        yColor: 'rgba(0,0,0,0.02)',
        yZeroLineColor: 'rgba(0,0,0,0.02)',
      }
    };
  }

  search(name) {
    if (!name.trim()) { return; }
    this.searching_school = true;
    this.apiSearchSchool();
  }

  total: number = 0;
  pageNumber: number = 1;

  apiSearchSchool() {
    this.schoolService.getSchools(this.pageNumber).subscribe(res => {
      this.searching_school = false;
      res.results.map(school => {
        if (school.village === '' || school.village === null) {
          school.village = 'None';
        }
        return school;
      });
      this.schools = res.results.splice(0, 4);
      console.log(this.schools);
    });
  }

  // updateFilter(event) {
  //   console.log(event)
  // }

  // onSearchChange(searchValue: string) {
  //   if (!this.searchChangeObserver) {
  //     Observable.create(observer => {
  //       this.searchChangeObserver = observer;
  //     }).pipe(debounceTime(500)) // wait 300ms after the last event before emitting last event
  //       .pipe(distinctUntilChanged()) // only emit if value is different from previous value
  //       .subscribe(data => {
  //         console.log(data);
  //       });
  //   }
  //   setTimeout(() => {
  //     this.searchChangeObserver.next(searchValue);
  //   }, 500);
  // }

}
