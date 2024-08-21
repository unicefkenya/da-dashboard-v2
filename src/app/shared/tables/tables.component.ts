import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SchoolService } from 'src/app/school/school.service';
import { NotificationsService } from '../notifications/notifications.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  data: any;
  page: any;
  row: any;
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent {

  @Input() columns;
  @Input() rows;
  @Input() data;
  @Input() page;
  @Input() total;
  @Input() pageNumber;
  @Input() tablePage;
  message: any;
  selected = [];
  deleteReasons: any;
  otherId: any;
  @Input() searching;
  @Input() searchValue;
  @Input() loaderStatus;
  search_name = '';
  // searching = false;
  @Output() setPage: EventEmitter<any> = new EventEmitter();
  @Output() searchPage: EventEmitter<any> = new EventEmitter();
  @Output() defaultValues: EventEmitter<any> = new EventEmitter();
  userAdmin: boolean;
  hideActions: boolean;

  constructor(public router: Router, public schoolService: SchoolService, public notifyService: NotificationsService,
    public dialog: MatDialog) {
    const user = JSON.parse(localStorage.getItem('user_profile'));
    this.userAdmin = (user.role === 'A');
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const data = this.data.filter(d => {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    // update the rows
    this.rows = data;
  }

  onActivate(event) {
    const editBtn = document.getElementById('edit-table-btn');
    const deleteBtn = document.getElementById('delete-table-btn');
  }

  pageNumberClicked(page): void {
    this.setPage.emit(page);
  }

  onSelect({ selected }) {
    //console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  editDetails(data) {
    // console.log(this.page)
    let name = `${data.first_name}-${data.last_name}`;
    if (this.page === 'student') {
      this.router.navigate(['students/add-student'], { queryParams: { name, student: data.id } });
    }
    if (this.page === 'Teacher') {
      this.router.navigate(['teachers/add-teacher'], { queryParams: { name, teacher: data.id } });
    }
    if (this.page === 'class') {
      name = `${data.base_class + data.name}`;
      this.router.navigate(['classes/add-class'], { queryParams: { name, stream: data.id } });
    }
    if (this.page === 'school') {
      this.router.navigate(['schools/add-school'], { queryParams: { name: data.name, school: data.id } });
    }
  }

  deleteDetail(data) {
    this.page === 'student' ? this.apiGetDeleteReasons(data) : this.openDialog(data);
  }

  viewDetails(data) {
    if (this.page === 'school') {
      this.router.navigate(['schools/schools-attendance'], { queryParams: { school_name: data.name, school: data.id } });
    } else if (this.page === 'student') {
      sessionStorage.setItem('studentDetails', JSON.stringify(data));
      this.router.navigate(['students/details'], {
        queryParams: {
          //details: JSON.stringify(data),
          // details: data,
          student: data.id
        }
      });
    }
  }

  generalDelete(url, id) {
    this.schoolService.delete(url).subscribe(res => {
      this.rows = this.rows.filter(row => row.id != id);
      this.total -= 1;
      this.notifyService.notify(`${this.page} has been successfully Deleted`, 'success');
    },
      error => {
        // console.log(error)
        this.notifyService.notify(`An error occured. Please try again after some time!`, 'error');
      });
  }

  openDialog(row): void {
    const width = this.page === 'student' ? '350px' : '250px';
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width,
      data: { row, page: this.page }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        const id = res.id;
        if (this.page === 'class') {
          const url = `streams/${id}/`;
          this.generalDelete(url, id);
        }
        if (this.page === 'school') {
          const url = `schools/${id}/`;
          this.generalDelete(url, id);
        }
        if (this.page === 'Teacher') {
          const url = `teachers/${id}/`;
          this.generalDelete(url, id);
        }
        if (this.page === 'student') {
          const selectedId = res.selectedId;
          const otherReason = res.otherReason;
          let url = '';
          if (!selectedId) { return this.notifyService.notify('Select a reason for deleting this student please!', 'error'); }
          if (!otherReason.trim() && selectedId == this.otherId) {
            return this.notifyService.notify('Provide other reason please!', 'error');
          }
          if (otherReason.trim() && selectedId == this.otherId) {
            url = `students/${id}/?reason=${selectedId}&description='${otherReason}'`;
          } else {
            url = `students/${id}/?reason=${selectedId}`;
          }
          this.generalDelete(url, id);
        }
      }
    });
  }

  apiGetDeleteReasons(data) {
    // when delete reasons exist
    if (this.deleteReasons) {
      data.deleteReasons = this.deleteReasons;
      data.otherId = this.otherId;
      data.otherReason = '';
      data.selectedId = null;
      return this.openDialog(data);
    }

    this.schoolService.getStudentDeleteReasons().subscribe(res => {
      if (res.results.length < 1) { return alert('No delete reasons provided. Ask admin to add.'); }
      const other = res.results.filter(reasons => reasons.name.toLocaleLowerCase() === 'other reason')[0];
      const index = res.results.indexOf(other);
      this.otherId = other.id;
      res.results.splice(index, 1);
      res.results.push(other);
      this.deleteReasons = res.results;
      data.otherId = this.otherId;
      data.deleteReasons = this.deleteReasons;
      data.otherReason = '';
      data.selectedId = null;
      this.openDialog(data);
    },
      error => {
        this.notifyService.notify(`An error occured getting delete reasons. Please try again after some time!`, 'error');
      });
  }

  search(searchValue) {
    if (!searchValue.trim()) { return; }
    //this.searching = true;
    this.searchPage.emit(searchValue);
    // this.searching = false;
  }

  // onKeyDown(event, name) {
  //   console.log(event, name, 'here');

  // }
  onKeyDown(): void {
    if (this.search_name.length <= 1) {
      this.defaultValues.emit('defaultValues');
    }
  }

}


// confirmation dialog
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: 'confirm-dialog.component.html',
  styleUrls: ['./tables.component.scss']
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
