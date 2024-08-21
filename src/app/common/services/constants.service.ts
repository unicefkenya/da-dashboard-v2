import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

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

export class ConstantsService {

  readonly rememberUser = this.getRememberMe()
  readonly token = this.getToken() // fixme: not accessible on interceptors
  readonly user: any = this.getUserProfile()

  constructor() { }

  setRememberMe(remember) {
    return localStorage.setItem('remember_me', remember)
  }

  getRememberMe(): boolean {
    return JSON.parse(localStorage.getItem('remember_me'));
  }

  setToken(token) {
    return localStorage.setItem('access_token', token)
  }
  getToken() {
    return localStorage.getItem('access_token')
  }

  setExpiresOn(time) {
    return localStorage.setItem('expires_on', JSON.stringify(time))
  }

  getExpiresOn() {
    return JSON.parse(localStorage.getItem('expires_on'))
  }

  setTimeLoggedIn(time) {
    return localStorage.setItem('time_logged_in', JSON.stringify(time))
  }

  getTimeLoggedIn() {
    return JSON.parse(localStorage.getItem('time_logged_in'))
  }

  setRefreshToken(token) {
    return localStorage.setItem('refresh_token', token)
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token')
  }

  setUserProfile(profile) {
    return localStorage.setItem('user_profile', JSON.stringify(profile))
  }

  getUserProfile() {
    return JSON.parse(localStorage.getItem('user_profile'))
  }

  setUserRole(type: string) {
    return (localStorage.setItem('user_role', type))
  }

  getUserRole() {
    return localStorage.getItem('user_role')
  }

  getServiceHeaders() {
    let authheaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + this.token
      })

    return { headers: authheaders }
  }
}
