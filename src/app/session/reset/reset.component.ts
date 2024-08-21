import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';
import { SessionService } from '../session.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  public form: FormGroup;
  private username: any;
  loader: boolean = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private auth: SessionService,
    private activatedRouter: ActivatedRoute,
    public notifyService: NotificationsService) { }

  ngOnInit() {
    this.username = this.activatedRouter.snapshot.params['dataPassed'];

    if (this.username === undefined) {
      this.router.navigate(['/session/signin']);
    }
    this.form = this.fb.group({
      reset_code: [null, Validators.compose([Validators.required])],
      new_password: [null, Validators.compose([Validators.required])],
      c_password: [null, Validators.compose([Validators.required])]
    }, {
      validator: this.sharedService.confirmPasswordValidator
    });
  }

  onSubmit() {
    this.loader = true;

    this.auth.resetPassword(this.form.value, this.username).subscribe(data => {
      this.loader = false;
      //console.log(data)
      if (data) {
        this.router.navigate(['/session/signin']);
      }
    }, error => {
      console.log(error)
      this.loader = false
    });
  }

  resendcode() {
    // console.log('Resend code')
    let body = {
      email: this.username,
    }
    this.auth.forgotPassword(body).subscribe(data => {
      this.loader = false;
      // console.log('code resent')
      //show the notification popup if successful
      this.notifyService.notify('Reset code has resent to your email.', 'success');
    }, error => {
      this.loader = false;
      //show the api error
      //show the notification popup if unsuccessful
      this.notifyService.notify('An error occured, please try again later!', 'error');
      // console.log(error)
    })
  }

}

