import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SchoolService } from '../school.service';
import { ConstantsService } from 'src/app/common/services/constants.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  public addClassForm: FormGroup;
  baseClasses: any;
  user: any;
  loader = false;
  update = false;
  class: any;
  error: any = ''

  constructor(private fb: FormBuilder, private schoolService: SchoolService, public router: Router,
    private constantService: ConstantsService, public activatedRoute: ActivatedRoute, public notifyService: NotificationsService) {
    this.baseClasses = [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }, { name: 5 }, { name: 6 },
    { name: 7 }, { name: 8 }
    ];

    this.addClassForm = this.fb.group({
      base_class: new FormControl('', Validators.required),
      name: new FormControl('')
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe(params => {
        if (Object.entries(params).length > 1) {
          this.update = true;
          this.getClass(params.stream);
        } else {
          this.update = false;
          this.addClassForm.reset();
        }
      });
  }

  onSubmit() {
    const user = JSON.parse(localStorage.getItem('user_profile'));
    this.loader = true;
    if (!this.addClassForm.value.name.trim()) { delete this.addClassForm.value.name; }
    this.addClassForm.value.school = user.school;
    this.update ? this.apiUpdateStream() : this.apiCreateStream();
  }

  apiCreateStream() {
    this.schoolService.addClass(this.addClassForm.value).subscribe(res => {
      this.loader = false;
      this.update = true;
      this.class = res;
      this.notifyService.notify('Class has been successfully created', 'success');
      this.addClassForm.reset();
    },
      error => {
        this.loader = false;
        this.error = error

        this.notifyService.notify('An error occured please try again later!', 'error');
        if (error === 'Stream already exists.') {
          return this.notifyService.notify('Stream already exists', 'error');
          
        } else {
          this.notifyService.notify('An error occure please try again later!', 'error');

        }
      });
  }

  apiUpdateStream() {
    this.schoolService.updateClass(this.addClassForm.value, this.class.id).subscribe(res => {
      this.loader = false;
      this.class = res;
      this.notifyService.notify('Class has been successfully updated', 'success');
      this.addClassForm.reset();
    },
      error => {
        this.loader = false;
        this.error = error

        if (error === 'Stream already exists.') {
          return this.notifyService.notify('Stream already exists', 'error');

        } else {
          return this.notifyService.notify('An error occurred please try again later!', 'error');
          
        }
        
      });
  }

  getClass(id) {
    this.schoolService.getSingleItem('streams', id).subscribe(res => {
      this.class = res;
      this.updateForm(res);
    });
  }

  updateForm(data) {
    this.addClassForm.setValue({
      base_class: Number(data.base_class),
      name: data.name
    });
  }

  addNewclass() {
    this.addClassForm.reset();
    this.update = false;
  }
}
