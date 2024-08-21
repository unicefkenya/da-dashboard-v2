import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../school.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  currentPage = 'student';
  students: any = [];
  temp_students: any;
  rows: any;
  temp: any;
  columns: any;
  total = 0;
  pageNumber = 0;
  params: any;
  searching: any;
  loader: any = false;

  constructor(private schoolService: SchoolService,
    private sharedService: SharedService,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.queryParams
      .subscribe(params => {
        // console.log( params['type'], 'here in student component')
        this.params = params['type'];
        if (params['type'] !== undefined) {
          this.getStudents(1, params['type']);
        } else {
          this.getStudents(1, 'none');
        }
      });
  }

  getStudents(page, gender) {
    // this.loader = true;
    this.schoolService.getStudents(page, gender).subscribe( res => {
      this.rows = res.results.map((student, index) => {
        this.loader = true;
        (page > 1) ? student.num = (page * 100) + (index + 1) : student.num = index + 1;
        student.full_names = `${student.first_name} ${student.middle_name} ${student.last_name}`;
        student.stream_name = `${student.base_class}${student.stream_name}`;
        if (!student.gender) { student.gender = '_'; }
        
        this.loader = false;
        return student;
      });

      this.columns = [
        { name: '#' , prop: 'num' },
        { name: 'NAME', prop: 'full_names' },
        { name: 'ADMISSION NUMBER' , prop: 'student_id' },
        { name: 'GENDER', prop: 'gender' },
        { name: 'SCHOOL', prop: 'school_name' },
        { name: 'CLASS', prop: 'stream_name' },
        { name: 'DATE ENROLLED' , prop: 'date_enrolled' }
      ];

      this.total = res.count;
    });
  }

  pageNumberClicked(page) {
    if (this.params !== undefined) {
      this.getStudents(page.offset + 1, this.params);
    } else {
      this.getStudents(page.offset + 1, 'none');
    }

  }

  searchStudent(name) {
    this.searching = true;
    this.loader = true;

    this.schoolService.getSearchedStudent(1, name).subscribe(res => {
      this.rows = res.results.map((student, index) => {
        (1 > 1) ? student.num = (1 * 100) + (index + 1) : student.num = index + 1;
        student.full_names = `${student.first_name} ${student.middle_name} ${student.last_name}`;
        student.stream_name = `${student.base_class}${student.stream_name}`;
        if (!student.gender) { student.gender = '_'; }
        return student;
      });
      this.columns = [
        { prop: 'num', name: '#' },
        { prop: 'full_names', name: 'NAME' },
        { prop: 'admission_no', name: 'ADMISSION NUMBER' },
        { name: 'GENDER', prop: 'gender' },
        { name: 'SCHOOL', prop: 'school_name' },
        { name: 'STREAM', prop: 'stream_name' },
        { prop: 'date_enrolled', name: 'DATE ENROLLED' }
      ];

      this.total = res.count;
      this.loader = false;
      
    });
    this.searching = false;
   

  }

  defaultValues(name) {
    if ( name ) {
        if (this.params !== undefined) {
          this.getStudents(1, this.params);
        } else {
          this.getStudents(1, 'none');
        }
    }
  }
}

