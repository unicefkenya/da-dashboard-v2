import { Component, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms'
import { NotificationsService } from 'src/app/shared/notifications/notifications.service'
import { SharedService } from 'src/app/shared/shared.service'
import { SettingsService } from '../settings.service'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public form: FormGroup
  submitted :boolean = false
  error: any = ''

  constructor(private fb: FormBuilder, 
    private notifyService: NotificationsService, private sharedService: SharedService, private settingsService:SettingsService) { 
    this.form = this.fb.group({ 
      old_password: [ null, Validators.compose([Validators.required])],
      new_password: [ null, Validators.compose([Validators.required])],
      c_password: [ null, Validators.compose([Validators.required ])],
    }, {
      validator: this.sharedService.confirmPasswordValidator
    })
  }

  ngOnInit() {
  }

  onSubmit(){
    this.submitted = true

    this.settingsService.changePassword(this.form.value).subscribe( res => {
      this.submitted = false
      this.notifyService.notify('Password has been changed successfully!', 'success')
      this.form.reset()
      
    }, error => {
      this.submitted = false
      this.notifyService.notify('Error on changing password, kindly try again!', 'error')
      this.error = error
  
    }) 
  }

}
