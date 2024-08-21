import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { SchoolService } from '../../school.service';
import * as moment from 'moment'

@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.scss']
})
export class IndividualComponent implements OnInit {

  bar: string = 'bar'
  studentDetails: any;
  percentAttendance: any = 0;
  presentDays: any = 0;
  totalDays: any = 0;
  dropoutProbability: any = 100;
  search_name: any
  searching_name: any
  students: any
  searching_student: any
  noAttendanceTaken: boolean = false;
  searching_school: any 
  daily_chart: boolean = false;
  att_d_resolver: boolean;
  att_d_distribution: { series: { series_a: any[]; series_b: any[]; labels: { label_a: string; label_b: string; }; }; labels: any[]; };

  constructor(private activatedRoute:ActivatedRoute, private router:Router, private schoolService: SchoolService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const studentId = params['student'];
      this.studentDetails = JSON.parse(sessionStorage.getItem('studentDetails'));
      
      this.childAttendance(studentId);
      this.dailyChildAttendance(studentId);

    });
  }


  childAttendance(id){
    this.schoolService.fetchChildAttendance(id).subscribe(
      (data)  =>
      {
        if ( data.results.length > 0 ) {
          this.presentDays=data.results[0]["present"]
          this.totalDays=data.results[0]["total"]
          if(this.presentDays !=0 && this.totalDays !=0){
            let per=Math.round(this.presentDays/this.totalDays*100)
              this.percentAttendance=per
              this.dropoutProbability = 100-per
              
          }
        } else {
          this.noAttendanceTaken = true;
          this.presentDays=0;
          this.totalDays=0;
        }
        
      });
  }

  search(name) {
    if (!name.trim()) { return; }
    this.searching_student = true;
    this.apiSearchStudent(1, name);
  }

  apiSearchStudent(pageNumber, name) {
    this.schoolService.getSearchedStudent(pageNumber, name).subscribe(res => {
      this.searching_student = false;
      res.results.map((student)=> {
        if (student.middle_name === null) {
          student.full_names = `${student.first_name} ${student.last_name}`;
        } else {
          student.full_names = `${student.first_name} ${student.middle_name} ${student.last_name}`;
        }
        
      })
      this.students = res.results.splice(0, 4);
    });
  }


  changeStudentDetails(data) {
    sessionStorage.setItem('studentDetails', JSON.stringify(data));
      this.router.navigate(['students/details'], {
        queryParams: {
          student: data.id
        }
      });
      this.students = [];
      this.search_name = '';
  }

  dailyChildAttendance(id){

    let month = moment().month()

    this.schoolService.fetchChildAttendance(id, month).subscribe(
      res => {

        let labels = []
        let presents = []
        let absents = [] 

        if(res.results.length){
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
              label_a: 'Presents',
              label_b: 'Absents'
            }
          },
          labels: labels
        }

        this.att_d_resolver = true

    }, error => {

    })

  }
  
  ngOnDestroy() {
    sessionStorage.removeItem('studentDetails');
  }

  bar_configs = {
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
  }

}