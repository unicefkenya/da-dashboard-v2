import { Component, OnInit } from '@angular/core'
import { SchoolService } from '../school.service'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import moment from 'moment'
import { ConstantsService } from 'src/app/common/services/constants.service'
import { Router, ActivatedRoute } from '@angular/router'
import { NotificationsService } from 'src/app/shared/notifications/notifications.service'

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit {
  addTeacherForm: FormGroup

  qualifications: any
  maritalStatus: any
  update = false
  classes: any
  loader = false
  checked = false
  teacher: any
  user: any
  errorMessage: any = ''


  constructor(public schoolService: SchoolService, private fb: FormBuilder, private constantService: ConstantsService,
    public route: Router, public activatedRoute: ActivatedRoute, private notifyService: NotificationsService, ) {
    this.qualifications = [{ name: 'University', value: 'UNI' }, { name: 'College', value: 'COL' }]

    this.maritalStatus = [{ name: 'Single', value: 'S' }, { name: 'Married', value: 'M' }, { name: 'Divorced', value: 'D' }]

    this.addTeacherForm = this.fb.group({
      first_name: new FormControl('', Validators.required),
      middle_name: new FormControl(''),
      last_name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      dob: new FormControl(''),
      qualifications: new FormControl('', Validators.required),
      marital_status: new FormControl('', Validators.required),
      email: new FormControl(''),
      is_school_admin: new FormControl(false),
      streams: new FormControl('', Validators.required),
    })


    this.addTeacherForm.get('is_school_admin').valueChanges.subscribe(checked => {
      checked ? this.addTeacherForm.removeControl('streams') :
        this.addTeacherForm.addControl('streams', new FormControl('', [Validators.required]))

      this.addTeacherForm.updateValueAndValidity()

    })

  }

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe(params => {
        if (Object.entries(params).length > 1) {
          this.update = true;
          this.getTeacher(params.teacher);
        } else {
          this.update = false;
          this.addTeacherForm.reset();
        }
      });
    this.getClasses();

    this.user = this.constantService.getUserProfile();
    // fixme: to be removed only works when logged in as a school
  }

  onSubmit() {
    const user = JSON.parse(localStorage.getItem('user_profile'))

    this.addTeacherForm.value.dob ? this.addTeacherForm.value.dob = moment(this.addTeacherForm.value.dob).format('YYYY-MM-DD') :
      delete this.addTeacherForm.value.dob

    this.addTeacherForm.value.school = user.school
    // todo: to be removed
    this.update ? this.updateTeacher() : this.createTeacher()

  }

  createTeacher() {
    this.loader = true 
    this.schoolService.addTeacher(this.addTeacherForm.value).subscribe(
      res => {
        this.loader = false
        this.teacher = res
        this.update = true
        this.notifyService.notify('A teacher has been added', 'success')
        this.addTeacherForm.reset()
      },
      error => {
        this.loader = false
        this.errorMessage = error

        if (error.error.phone[0] === 'teacher with this phone already exists') {
          this.errorMessage = 'A teacher with this phone number already exists'
        } else {
          return this.notifyService.notify('An error occured, please try again later!', 'error')
        }
      })
  }

  updateTeacher() {
    this.loader = true 
    this.schoolService.updateTeacher(this.addTeacherForm.value, this.teacher.id).subscribe(res => {
      this.loader = false
      this.teacher = res
      this.notifyService.notify('Teacher has been successfully Updated', 'success')
      this.addTeacherForm.reset()  
      
    },
      error => {
        this.loader = false
        this.errorMessage = error
        return  this.notifyService.notify('An error occured, please try again later!', 'error')  
      
      })   
  }


  updatePopulateForm() {
    if (!this.teacher.dob) {
      this.teacher.dob = ''
    }
    const data = {
      first_name: this.teacher.first_name,
      middle_name: this.teacher.middle_name,
      last_name: this.teacher.last_name,
      phone: this.teacher.phone,
      dob: this.teacher.dob,
      qualifications: this.teacher.qualifications,
      marital_status: this.teacher.marital_status,
      email: this.teacher.email,
      is_school_admin: this.teacher.is_school_admin,
      streams: this.teacher.streams,
    }

    if (this.teacher.is_school_admin) {
      delete data.streams

      this.addTeacherForm.removeControl('streams')

      this.addTeacherForm.updateValueAndValidity()

    }
    this.addTeacherForm.setValue(data)

  }

  getClasses() {
    this.schoolService.getClasses(1).subscribe(res => {
      if (res.results.length < 1) {
        return
      }
      this.classes = res.results

    })

  }

  addNewTeacher() {
    this.addTeacherForm.reset()

    this.update = false

  }

  getTeacher(id) {
    this.schoolService.getSingleItem('teachers', id).subscribe(res => {
      this.teacher = res

      this.updatePopulateForm()

    })

  }

}
