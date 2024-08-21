import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import mixpanel from 'mixpanel-browser';

import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms'

import { SessionService } from '../session.service'
import { ConstantsService } from 'src/app/common/services/constants.service'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  year: number = new Date().getFullYear();

  public form: FormGroup
  checked: false
  loginError: string = ''
  loaderStatus: boolean = false

  constructor(private fb: FormBuilder, private router: Router, private auth: SessionService, private constantService: ConstantsService) {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      checked: [null]
    })
  }

  ngOnInit() {
    // const rememberMe = this.auth.getRememberMe()
    // if ( rememberMe ) {
    // } 
  }

  onSubmit() {

    this.loaderStatus = true
    this.loginError = ""
    this.auth.login(this.form.value).subscribe(res => {
      this.loaderStatus = false
      const user = res as any;
      mixpanel.identify(user.id);
      mixpanel.people.set({
        '$username': user.username,
        '$email': user.email,
        '$last_login': new Date(),
      })
      this.router.navigate(['/'])

    }, err => {
      this.loaderStatus = false
      this.loginError = err
    })
  }

}
