import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { ConstantsService } from '../common/services/constants.service';
import { SessionService } from '../session/session.service';
import { DashboardService } from './dashboard.service';
import * as moment from 'moment'
import { Router } from '@angular/router';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [

    // trigger('cardAnimation', [
    //   transition('* => *', [

    //     query('.card-widget', style({ opacity: 0, transform: 'translateX(-40px)' })),

    //     query('.card-widget', stagger('300ms', [
    //       animate('300ms 1.2s ease-in', style({ opacity: 1, transform: 'translateX(0)' })),
    //     ])),

    //     query('.card-widget', [
    //       animate(300, style('*'))
    //     ])
    //   ])
    // ])
  ]
})
export class DashboardComponent implements OnInit {

  public statistics: any = {}
  public singlebar: string = 'bar'
  public bar: string = 'bar'
  public doughnut: string = 'doughnut'
  public students: any = {}
  public en_distribution = {}
  public att_distribution = {}
  public class_distribution = {}
  public att_m_distribution = {}
  public att_d_distribution = {}
  public en_resolver: boolean = false
  public att_resolver: boolean = false
  public class_resolver: boolean = false
  public att_d_resolver: boolean = false
  public att_m_resolver: boolean = false
  public role: any = ''
  public stats_widget_size: number

  public daily_chart: boolean
  public monthly_chart: boolean
  public annual_chart: boolean
  public enrolment_class_chart: boolean
  public enrolment_gender_chart: boolean
  public enrolment_lwd_chart: boolean

  monthlyLoading: boolean = false
  dailyLoading: boolean = false
  yearlyLoading: boolean = false



  constructor(translate: TranslateService,
    private snackBar: MatSnackBar,
    private _constant: ConstantsService,
    private session: SessionService,
    private dashboardService: DashboardService,
    private route: Router) {

    // TODO: implement translations later
    // translate.addLangs(['en', 'fr'])
    // translate.setDefaultLang('en')
    // const browserLang: string = translate.getBrowserLang()
    // translate.use(browserLang.match(/en|fr/) ? browserLang : 'en')
  }

  ngOnInit() {

    const user = this.dashboardService.getUser()

    this.role = this._constant.getUserRole()
    if (this.role == 'A') {
      this.stats_widget_size = 20
    } else if (this.role == 'SCHA') {
      this.stats_widget_size = 25
    }
    this.stats_widget_size = 20

    this.getStatistics()

    this.getEnrols()
    this.getAttendance()
  }

  getEnrols() {
    this.getGenderEnrols()
    this.getClassEnrols()
    this.getSpecialNeedsEnrols()
  }

  getStatistics(query: string = '') {
    this.dashboardService.getStatistics(query).subscribe(res => {
      this.statistics = {
        schools: res.active_schools,
        boys: res.students.males,
        girls: res.students.females,
        students: res.students.females + res.students.males, // fixme: check api for total students
        dropouts: (res.students.dropout_males + res.students.dropout_females)
      }
    })
  }

  getGenderEnrols() {
    this.dashboardService.getEnrolments('gender').subscribe(res => {

      // fix-me: refactor
      if (res.results.length) {
        this.enrolment_gender_chart = true
      } else {
        this.enrolment_gender_chart = false
      }

      // console.log(res)
      let males = 0
      let females = 0
      try {
        males = res.results.filter(gend => gend.value == "M")[0]!.total_students || 0
      } catch (error) { }

      try {
        females = res.results.filter(gend => gend.value == "F")[0]!.total_students || 0
      } catch (error) { }

      this.en_distribution = {
        data: [males, females],
        labels: ['Boys Enrolled', 'Girls Enrolled']
      }

      this.en_resolver = true
    })
  }

  getSpecialNeedsEnrols() {
    this.dashboardService.getEnrolments('special-need').subscribe(res => {
      console.log(res, 'resulttttt')

      if (res.results.length) {
        this.enrolment_lwd_chart = true
      } else {
        this.enrolment_lwd_chart = false
      }


    })
  }



  getClassEnrols() {

    this.class_distribution = {}

    let series: any = []
    let labels: any = []

    this.dashboardService.getEnrolments('class').subscribe(res => {

      if (res.results.length) {
        this.enrolment_class_chart = true
      } else {
        this.enrolment_class_chart = false
      }

      for (let i in res.results) {

        if (res.results[i].value < 7) {
          labels.push("Class " + res.results[i].class_name)
        } else {
          labels.push("Class " + res.results[i].class_name)
        }
        series.push(res.results[i].total_students)
      }

      // fix-me: refactor
      this.class_distribution = {
        series: {
          series_a: series,
          series_b: series,
          labels: {
            label_a: 'Enrolments',
            label_b: 'Enrolments'
          }
        },
        labels: labels,
      }
      // console.log(labels)

      this.class_resolver = true
    })

    // this.class_distribution = {}

    // let series: any = []
    // let labels: any = []

    // this.dashboardService.getEnrolments('class').subscribe(res => {

    //   if (res.results.length) {
    //     this.enrolment_class_chart = true
    //   } else {
    //     this.enrolment_class_chart = false
    //   }

    //   for (let i in res.results) {

    //     if (res.results[i].value < 7) {
    //       labels.push("Grade " + res.results[i].value)
    //     } else {
    //       labels.push("Class " + res.results[i].value)
    //     }
    //     series.push(res.results[i].total_students)
    //   }

    //   // fix-me: refactor
    //   this.class_distribution = {
    //     series: {
    //       series_b: series,
    //       labels: {
    //         label_a: 'Enrolments',
    //         label_b: 'Enrolments'
    //       }
    //     },
    //     labels: labels,
    //   }

    //   this.class_resolver = true
    // })
  }

  getAttendance() {
    this.getDailyAttendance()
    this.getYearlyAttendance()
    this.getMonthlyAttendance()
  }

  showStudents(type) {
    this.route.navigate(['students/view-students'], {
      queryParams: {
        type: type
      }
    });
  }

  getYearlyAttendance() {
    this.yearlyLoading = true
    this.dashboardService.getAttendance('year').subscribe(res => {
      this.yearlyLoading = false
      if (res.results.length) {
        this.annual_chart = true

        this.att_distribution = {
          data: [
            res.results[0].present_males,
            res.results[0].absent_males,
            res.results[0].present_females,
            res.results[0].absent_females],
          labels: ['Boys present', 'Boys Absent', 'Girls present', 'Girls absent']
        }

      } else {
        this.annual_chart = false
      }


      this.att_resolver = true
    }, error => {
      console.log(error)
      this.yearlyLoading = false
    })
  }

  getMonthlyAttendance() {
    this.monthlyLoading = true
    this.dashboardService.getAttendance('monthly').subscribe(res => {
      this.monthlyLoading = false
      let labels = []
      let presents = []
      let absents = []

      if (res.results.length) {
        this.monthly_chart = true
      } else {
        this.monthly_chart = false
      }

      for (let i in res.results) {

        res.results[i].value = res.results[i].value.replace(/\b(\d{1})\b/g, '0$1') // fixme: bug on the date returned from the API - No ISO format.
        labels.push(moment(res.results[i].value).format('MMM'))
        let absentsTotal = (res.results[i].absent_males + res.results[i].absent_females) / 2

        let presentTotal = (res.results[i].present_males + res.results[i].present_females) / 2

        let total = absentsTotal + presentTotal

        let absentPercent = (absentsTotal / total) * 100
        let presentPercent = (presentTotal / total) * 100


        presents.push(parseFloat(presentPercent.toString()).toFixed(2))
        absents.push(parseFloat(absentPercent.toString()).toFixed(2))
      }
      console.log(presents)
      console.log(absents)

      this.att_m_distribution = {
        series: {
          series_a: presents,
          series_b: absents,
          labels: {
            label_a: 'Present',
            label_b: 'Absent'
          }
        },
        labels: labels
      };

      this.att_m_resolver = true
    }, error => {
      this.monthlyLoading = false
      console.log(error)
    })

  }

  getDailyAttendance() {

    let labels = []
    let presents = []
    let absents = []
    this.dailyLoading = true
    this.dashboardService.getAttendance('daily').subscribe(res => {
      this.dailyLoading = false
      // todo: distribute per gender in next rollout

      if (res.results.length) {
        this.daily_chart = true
      } else {
        this.daily_chart = false
      }

      for (let i in res.results) {
        labels.push(moment(res.results[i].value).format('DD-MM-YY'))
        presents.push(res.results[i].present_males + res.results[i].present_females)
        absents.push(res.results[i].absent_males + res.results[i].absent_females)
      }

      this.att_d_distribution = {
        series: {
          series_a: presents,
          series_b: absents,
          labels: {
            label_a: 'Present',
            label_b: 'Absent'
          }
        },
        labels: labels
      }

      this.att_d_resolver = true
    }, error => {
      this.dailyLoading = false
      console.log(error)
    })

  }

  bar_configs = {
    legend: true,
    labelString: 'Days',
    colors: {
      colors: [
        {
          backgroundColor: 'rgb(32,150,243,0.7)',
          borderColor: 'rgb(32,150,243, 0.7)',
          pointBackgroundColor: 'rgb(32,150,243, 0.7)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(32,150,243, 0.7)'
        },
        {

          backgroundColor: 'rgb(216,3,81,0.9)',
          borderColor: 'rgb(146,146,146,0)',
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
  }

  monthly_attendance_configs = {
    ...this.bar_configs,
    labelString: 'Months',
    yLabelString: 'Attendance %'
  }

  learner_configs = {
    legend: false,
    labelString: 'Grade / Class',
    colors: {
      colors: [
        {
          backgroundColor: 'transparent',
          borderColor: 'transparent'
        },
        {
          backgroundColor: 'rgb(32,150,243,0.7)',
        }
      ],
      xColor: 'rgba(0,0,0,0.02)',
      xZeroLineColor: 'rgba(0,0,0,0.02)',
      yColor: 'rgba(0,0,0,0.02)',
      yZeroLineColor: 'rgba(0,0,0,0.02)',
    }
  }

  // learner_configs = {
  //   legend: false,
  //   labelString: 'Grade / Class',
  //   colors: {
  //     colors: [
  //       {
  //         backgroundColor: 'transparent',
  //       },
  //       {
  //         backgroundColor: 'rgb(32,150,243,0.7)',
  //       }
  //     ],
  //     xColor: 'rgba(0,0,0,0.02)',
  //     xZeroLineColor: 'rgba(0,0,0,0.02)',
  //     yColor: 'rgba(0,0,0,0.02)',
  //     yZeroLineColor: 'rgba(0,0,0,0.02)',
  //   }
  // }

  doughnut_configs = {
    colors: ['#2096f3', '#F5D908']
  }

  attendance_doughnut_configs = {
    colors: ['#2096f3', '#ff0059e8', '#F5D908', '#e91d63'],

  }

}