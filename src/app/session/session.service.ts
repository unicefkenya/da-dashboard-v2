import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'
import { tap, map, catchError, mergeMap } from 'rxjs/operators'
import { ConstantsService } from '../common/services/constants.service'
import { Router } from '@angular/router'
import { User } from '../core/models/auth.models'
import { CookieService } from '../core/services/cookie.service'
import * as moment from 'moment'
import { SharedService } from '../shared/shared.service'
// import { ConsoleReporter } from 'jasmine';

const client_id = environment.APIClientID
const endpoint = environment.APIEndpoint
const endpointV1 = environment.APIv1Endpoint


@Injectable({
  providedIn: 'root'
})

// export class User {
//   id: number
//   changed_password: boolean
//   dob: string
//   dummy: boolean
//   email: string
//   first_name: string
//   gender: string
//   gender_display: string
//   image: string
//   last_name: string
//   phone: string
//   profile_image: string
//   role: string
//   username: string
// }

export class SessionService {

  constructor(private http: HttpClient, private sharedService: SharedService, private _constant: ConstantsService,
    private router: Router, private cookieService: CookieService) {

  }

  login_data: any;
  rememberUser: boolean = this._constant.rememberUser
  token: any = this._constant.token
  headers: any = this._constant.getServiceHeaders()
  userPerson: any = this._constant.user
  user: User

  login(auth) {

    this.login_data = {
      username: auth.username,
      password: auth.password,
      client_id: client_id,
      grant_type: 'password'
    }

    const rememberMe = (auth.checked === true);
    this._constant.setRememberMe(rememberMe);


    return this.http.post<any>(endpoint + 'auth/token/', this.login_data).pipe(
      mergeMap(res => {

        this._constant.setToken(res['access_token'])
        this._constant.setExpiresOn(res['expires_in'])
        this._constant.setRefreshToken(res['refresh_token'])
        // this._constant.setExpiresOn( res['expires_in'] )
        // this._constant.setExpiresOn( moment().add(60, 's') )
        this._constant.setTimeLoggedIn(moment.now())
        this.cookieService.setCookie('current_user', JSON.stringify(res), 1)
        window.sessionStorage.setItem('activeSession', JSON.stringify(true));

        return this.userProfile()

      })
    )

    // todo: Set timeout when there's no internet.

  }

  isTokenExpired() {
    //get the value of the stored signin time
    const expiryTime = this._constant.getExpiresOn()

    //get refresh token
    const refreshToken = this._constant.getRefreshToken

    //if the user had chcecked the remember Me 
    const rememberMe = this._constant.rememberUser

    //get the current time
    const now = moment().valueOf()

    // addd expiry time to an additional 50 minutes and transform it into milliseconds
    const afternow = moment(expiryTime).add(50, 'm').toDate()
    const nowAfter = moment(afternow).valueOf()


    //if the current time is greater than the stored expiry then refresh the token
    if (now > nowAfter && rememberMe) {

      console.log('token expired so its true')

      return this.http.post<any>(endpoint + 'auth/token/', "refresh_token=" + refreshToken + "&grant_type=refresh_token&client_id=" + client_id).pipe(
        mergeMap(res => {

          this._constant.setToken(res['access_token'])
          this._constant.setExpiresOn(res['expires_in'])
          this._constant.setRefreshToken(res['refresh_token'])

          return this.userProfile()
        }),
      )
    }
    //if the current time is less than the expiry time then redirect to dashboard
    else if (now < nowAfter && rememberMe) {
      // console.log('token expired is not true')
      this.router.navigate(['/'])
    }
    else {
      this.logout();
    }

    // todo: Set timeout when there's no internet.
  }

  userProfile() {
    return this.http.get(endpointV1 + 'users/me/profile/').pipe(
      tap(res => {
        this._constant.setUserProfile(res);

        // set user tycope
        this._constant.setUserRole(res['role']);

      })
    );
  }

  forgotPassword(user: any) {
    let body = {
      username: user.email,
    }

    return this.http.post<any>(endpointV1 + 'users/forgot-password', body)

  }

  resetPassword(user: any, username) {
    user.confirm_password = user.c_password
    return this.http.post<any>(endpointV1 + 'users/reset-password', user);

  }

  userCheckedRemember() {
    if (this.rememberUser) { }
  }

  logout() {
    this.cookieService.deleteCookie('current_user')
    return localStorage.clear()
  }

  currentUser(): User {
    if (!this.user) {
      this.user = JSON.parse(this.cookieService.getCookie('current_user'))
    }
    return this.user;
  }
}
