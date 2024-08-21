import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../school.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';

@Component({
  selector: 'app-move-students',
  templateUrl: './move-students.component.html',
  styleUrls: ['./move-students.component.scss']
})
export class MoveStudentsComponent implements OnInit {
  public MoveStudentsform: FormGroup;
  classes: any;
  to: any;
  from: any;
  currentFromClass: any;
  hideTo = true;
  allStudents: any;
  markAll = false;
  error: any = ''

  constructor(private fb: FormBuilder, public schoolService: SchoolService, public notifyService: NotificationsService) {
    this.MoveStudentsform = this.fb.group({
      to: new FormControl('', Validators.required),
      from: new FormControl('', Validators.required),
      students: new FormControl('', Validators.required),
    });

    this.MoveStudentsform.get('from').valueChanges.subscribe(currentClass => {
      if (currentClass !== this.currentFromClass) {
        this.allStudents = [];
        this.currentFromClass = currentClass;
        this.getClassStudents(currentClass);
        this.MoveStudentsform.get('to').setValue('');
        this.hideTo = true;
      }
    });
  }

  ngOnInit() {
    this.getClasses();
  }

  onSubmit() {
    if (this.MoveStudentsform.value.to === this.MoveStudentsform.value.from) {
      this.MoveStudentsform.get('to').setValue('');
      return this.notifyService.notify('Can not move students to the same class', 'error');
    }
    const data = this.MoveStudentsform.value.students.map(student => {
      student.stream = this.MoveStudentsform.value.to;
      return student;
    });
    this.schoolService.moveStudents(data).subscribe(res => {
      this.allStudents = this.allStudents.filter(student => !this.MoveStudentsform.value.students.includes(student));
      if (this.markAll) { this.markAll = false; }
      this.notifyService.notify('Students successfully moved', 'success');
    },
      error => {
        this.error = error
        this.notifyService.notify('An error occure please try again later!', 'error');
      });
  }

  selectAll() {
    if (this.markAll) {
      this.markAll = false;
      this.MoveStudentsform.get('students').setValue('');
    } else {
      this.markAll = true;
      this.MoveStudentsform.get('students').setValue([...this.allStudents]);
    }
  }

  singleStudent() {
    if (this.allStudents.length === this.MoveStudentsform.value.students.length) {
      this.markAll = true;
    } else {
      this.markAll = false;
    }
  }

  getClasses() {
    this.schoolService.getClasses(1).subscribe(res => {
      if (res.results.length < 1) { console.log('no classes'); return; }
      this.classes = res.results.sort((a, b) => (a.base_class > b.base_class) ? 1 : -1);;
    });
  }

  getClassStudents(id) {
    const url = `students?stream=${id}&active=true`;
    this.schoolService.filter(url).subscribe(res => {
      if (res.results.length < 1) { 
        return this.notifyService.notify('This class has no students', 'info'); 
      }
      this.hideTo = false;
      this.allStudents = res.results;
      this.markAll = false;
    },
      error => {
        console.log(error);
      });
  }

}
