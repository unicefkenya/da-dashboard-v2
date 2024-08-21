import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { NotificationsComponent } from './notifications.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  public icon: string = ''

  constructor(
    public snackBar: MatSnackBar,
  ) { }


  configSuccess: MatSnackBarConfig = {
    panelClass: 'green-snackbar',
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'bottom'
  };

  notify(message, action = 'info') {

    if (action == 'success') {
      this.configSuccess.panelClass = 'green-snackbar'
      this.icon = 'done'

    } else if (action == 'error') {
      this.configSuccess.panelClass = 'red-snackbar'
      this.icon = 'error'

    } else if (action == 'warning') {
      this.configSuccess.panelClass = 'yellow-snackbar'
      this.icon = 'warning'

    } else if (action == 'info') {
      this.configSuccess.panelClass = 'blue-snackbar'
      this.icon = 'info'

    } else {
      this.icon = 'info'
    }

    const prep_message = {
      message: message,
      icon: this.icon
    }

    this.snackBar.openFromComponent(NotificationsComponent, {
      data: prep_message,
      ...this.configSuccess
    })
  }

}
