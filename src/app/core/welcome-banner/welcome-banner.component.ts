import { Component, OnInit } from '@angular/core'
import { ConstantsService } from 'src/app/common/services/constants.service'
import * as moment from 'moment'
import { SessionService } from 'src/app/session/session.service';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
@Component({
  selector: 'app-welcome-banner',
  templateUrl: './welcome-banner.component.html',
  styleUrls: ['./welcome-banner.component.scss'],
  animations: [

    trigger('welcomeAnimation', [
      transition('* => *', [

        query('.welcome-banner', style({ opacity: 0, transform: 'translateY(-40px)' })),

        query('.welcome-banner', stagger('200ms', [
          animate('400ms 1.2s ease-in', style({ opacity: 1, transform: 'translateY(0)' })),
        ])),

        query('.welcome-banner', [
          animate(1000, style('*'))
        ])
      ])
    ])
  ]
})
export class WelcomeBannerComponent implements OnInit {
  constructor(private _constant: ConstantsService, private sessionService: SessionService) { }

  public loggedInUser: string = ''
  timer: any
  user: any

  ngOnInit() {

    this.user = this._constant.getUserProfile()

    console.log(this.user, 'my user')

    if (this.user.first_name != "" && this.user.last_name != "") {
      this.loggedInUser = this.user.first_name + " " + this.user.last_name
    } else {
      this.loggedInUser = this.user.username
    }

    this.startTimer()
  }
  get loggedInRoleName() {
    if (this.user)
      return this.user.role_name
    return ""
  }

  startTimer() {
    let startTimestamp = this._constant.getTimeLoggedIn()
    this.timer = moment(startTimestamp).format('hh:mm A')
  }
}
