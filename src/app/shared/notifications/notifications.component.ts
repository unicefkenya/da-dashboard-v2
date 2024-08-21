import { Component, OnInit, Inject } from '@angular/core'
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {

  durationInSeconds = 5

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, private snackBar: MatSnackBar) { }


  dismissSnackBar() {
    this.snackBar.dismiss()
  }

}
