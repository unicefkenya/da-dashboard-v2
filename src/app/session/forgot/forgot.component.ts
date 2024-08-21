import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { SessionService } from '../session.service';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  public form: FormGroup;
  loader: boolean = false;
  constructor(private fb: FormBuilder, private router: Router, private auth: SessionService, public notifyService: NotificationsService) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required,])]
    });
  }

  onSubmit() {
    // this.router.navigate(['/session/reset']);
    this.auth.forgotPassword(this.form.value).subscribe(data => {
      //console.log(data)
      this.loader = false;
      // console.log('code resent')
      //show the notification popup if successful
      this.notifyService.notify('Reset code has been sent to your email.', 'success');

      if (data) {
        this.router.navigate(['/session/reset', { dataPassed: this.form.value.email }], { skipLocationChange: true })
      }
    }, error => {
      this.loader = false;
      //show the api error
      //show the notification popup if unsuccessful
      this.notifyService.notify('An error occured, please try again later!', 'error');
    });
  }
}
