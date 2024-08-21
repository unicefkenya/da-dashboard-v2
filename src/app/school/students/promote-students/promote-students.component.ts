import { Component, OnInit, Inject } from '@angular/core'
import { SchoolService } from '../../school.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { NotificationsService } from 'src/app/shared/notifications/notifications.service'

export interface DialogData {
  classes: any
  selected_id: any
  streams: any
  from_class: any;
}

@Component({
  selector: 'app-promote-students',
  templateUrl: './promote-students.component.html',
  styleUrls: ['./promote-students.component.scss']
})
export class PromoteStudentsComponent implements OnInit {
  streams: any
  promotionData = []
  streamsToPromote: any
  showPromotionBtn = true
  promotionId: any
  completePromotion = false
  unDoPromotion = false
  school: any
  user: any;
  error: any = ''

  constructor(public schoolService: SchoolService, public dialog: MatDialog, public notifyService: NotificationsService, ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user_profile'));
    this.getStreams();
    this.apiCheckPromotionStatus();
  }

  getStreams() {
    this.schoolService.getClasses(1).subscribe(res => {
      this.streams = res.results.sort((a, b) => (a.base_class > b.base_class) ? 1 : -1);
      this.streamsToPromote = this.streams.filter(stream => Number(stream.base_class) < 8);
    },
      error => {
        // console.log(error);
      });
  }

  promoteDialog(stream, i): void {
    const from = `${stream.base_class}${stream.name}`;
    const nextStream = this.streams.filter(dt => Number(dt.base_class) === Number(stream.base_class) + 1);
    if (nextStream.length < 1) { return this.notifyService.notify(`Please create class ${Number(stream.base_class) + 1} first`, 'error'); }
    const dialogRef = this.dialog.open(PromoteToDialogComponent, {
      width: '250px',
      data: { streams: nextStream, selected_id: stream.promote_to_id, from_class: from }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        const promoteTo = this.streams.filter(str => str.id == res)[0]
        this.streamsToPromote[i].promote_to = `${promoteTo.base_class}${promoteTo.name}`
        this.streamsToPromote[i].promote_to_id = res
        let streamPromoted = false
        this.promotionData.map(data => {
          if (data.prev_class == stream.id) {
            streamPromoted = true
            data.next_class = res
          }
          return data
        })
        if (!streamPromoted) { this.promotionData.push({ prev_class: stream.id, next_class: res }) }
        this.showPromotionBtn = !(this.promotionData.length === this.streamsToPromote.length)
      }
    })
  }

  promoteSchoool() {
    if (this.completePromotion) { return this.apiCompletePromotion() }
    const dataToSend = {
      stream_promotions: this.promotionData,
      school: this.user.school,
      year: new Date().getFullYear() + 1
    }
    this.schoolService.promoteSchool(dataToSend, 'promotions').subscribe(res => {
      this.promotionId = res.id
      this.completePromotion = true
      this.apiCompletePromotion()
    },
      error => {
        this.error = error

        if (error === 'Promotions already done for this school.') {
          return this.notifyService.notify('A class can only be promoted once a year', 'error');

        } else {
          this.notifyService.notify('An error occured please try again later!', 'error');
          
        }
      });
  }

  apiCompletePromotion() {
    const data = { action: 'complete' }
    const url = `promotions/${this.promotionId}/complete`
    this.schoolService.promoteSchool(data, url).subscribe(res => {
      this.completePromotion = false
      this.unDoPromotion = true
      this.notifyService.notify('Promotion completed successfully!', 'success')
    },
      error => {
        this.completePromotion = true
        this.notifyService.notify('An error occured please try again later!', 'error')
      })
  }

  reversePromotion() {
    const data = { action: 'undo' }
    const url = `promotions/${this.promotionId}/complete`
    this.schoolService.promoteSchool(data, url).subscribe(res => {
      this.unDoPromotion = false
      this.completePromotion = false
      this.notifyService.notify('Promotion reversed successfully!', 'success')
    },
      error => {
        this.notifyService.notify('An error occured please try again later!', 'error');
      });
  }

  apiCheckPromotionStatus() {
    const year = new Date().getFullYear() + 1;
    const url = `promotions/?school=${this.user.school}&year=${year}`;
    this.schoolService.filter(url).subscribe(res => {
      if (res.results[0] === undefined) { return; }
      if (res.results[0].stream_promotions) {
        res.results[0].stream_promotions[0].completed ? this.unDoPromotion = true : this.completePromotion = true;
        this.showPromotionBtn = !this.completePromotion;
        this.promotionId = res.results[0].id;
      }
    },
      error => {
        console.log(error)
      })
  }

}

// promote to popup
@Component({
  selector: 'app-promote-to',
  templateUrl: './promote-to-dialog.component.html',
  styleUrls: ['./promote-students.component.scss']
})
export class PromoteToDialogComponent {
  selectedId: any
  constructor(
    public dialogRef: MatDialogRef<PromoteToDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.selectedId = data.selected_id
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

}
