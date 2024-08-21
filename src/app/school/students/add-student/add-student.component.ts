import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SchoolService } from '../../school.service';
import { ConstantsService } from 'src/app/common/services/constants.service';
import { Router, ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  addStudentForm: FormGroup;
  classes: any;
  loader = false;
  sex: any;
  specialNeeds: any;
  studentStatus: any;
  guardianStatus: any;
  update = false;
  student: any;
  error: any = ''

  constructor(private fb: FormBuilder, private schoolService: SchoolService, public router: Router,
    public activatedRoute: ActivatedRoute, public notifyService: NotificationsService) {

    this.sex = [{ gender: 'Male', value: 'M' }, { gender: 'Female', value: 'F' }];

    this.specialNeeds = [{ value: 'N', name: 'None' }, { value: 'V', name: 'Visual Impairements' },
    { value: 'H', name: 'Hearing Impairements' }, { value: 'P', name: 'Physical Disabilities' },
    { value: 'L', name: 'Learning Difficulties' }
    ];

    this.studentStatus = [{ value: 'N', name: 'None' }, { value: 'R', name: 'Refugee' },
    { value: 'A', name: 'Asylum Seekers' }, { value: 'I', name: 'IDPs' },
    ];

    this.guardianStatus = [{ value: 'N', name: 'None' }, { value: 'S', name: 'Single Parent' }, { value: 'B', name: 'Both Parents' }];

    this.addStudentForm = this.fb.group({
      first_name: new FormControl('', Validators.required),
      middle_name: new FormControl(''),
      last_name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      date_of_birth: new FormControl(''),
      stream: new FormControl('', Validators.required),
      status: new FormControl(''),
      guardian_status: new FormControl(''),
      special_needs: new FormControl('', Validators.required),
      admission_no: new FormControl('', Validators.required),
      guardian_phone: new FormControl(''),
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe(params => {
        if (Object.entries(params).length > 1) {
          this.update = true;
          this.getStudent(params.student);
        } else {
          this.update = false;
          this.addStudentForm.reset();
        }
      });
    this.getClasses();
  }

  onSubmit() {
    this.loader = true;
    this.addStudentForm.value.date_of_birth = moment(this.addStudentForm.value.date_of_birth).format('YYYY-MM-DD');
    if (!this.update) {
      this.addStudentForm.value.date_enrolled = moment().format('YYYY-MM-DD');
      this.createStudent();
    } else {
      this.addStudentForm.value.date_enrolled = moment(this.student.date_enrolled).format('YYYY-MM-DD');
      this.updateStudent();
    }
  }

  createStudent() {
    this.loader = true
    this.schoolService.addStudent(this.addStudentForm.value).subscribe(res => {
      this.loader = false;
      this.student = res;
      this.update = true;
      this.notifyService.notify('Student has been successfully Created', 'success');
    },
      error => {
        this.loader = false;
        this.error = error
        this.notifyService.notify('An error occured please try again later!', 'error');
      });
  }

  updateStudent() {
    this.loader = true
    this.schoolService.updateStudent(this.addStudentForm.value, this.student.id).subscribe(
      res => {
        this.loader = false;
          this.student = res;
          this.notifyService.notify('Student has been successfully updated', 'success');
        },
        error => {
          this.loader = false;
          this.error = error
          this.notifyService.notify('An error occured please try again later!', 'error');
        });
  }

  addNewStudent() {
    this.addStudentForm.reset();
    this.update = false;
  }

  getClasses() {
    this.schoolService.getClasses(1).subscribe(res => {
      if (res.results.length < 1) { 
        return; 
      }
      this.classes = res.results;
    });
  }

  getStudent(id) {
    this.schoolService.getSingleItem('students', id).subscribe(res => {
      this.student = res;
      this.updateForm(res);
    });
  }

  updateForm(data) {
    this.addStudentForm.setValue({
      first_name: data.first_name,
      middle_name: data.middle_name,
      last_name: data.last_name,
      gender: data.gender,
      date_of_birth: data.date_of_birth,
      stream: data.stream,
      status: data.status,
      guardian_status: data.guardian_status,
      special_needs: data.special_needs,
      admission_no: data.admission_no,
      guardian_phone: data.guardian_phone,
    });
  }
}
