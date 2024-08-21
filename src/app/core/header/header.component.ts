import { Component, EventEmitter, Output } from '@angular/core';

import * as screenfull from 'screenfull';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/session/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output()
  toggleSidenav = new EventEmitter<void>();
  @Output()
  toggleNotificationSidenav = new EventEmitter<void>();

  constructor(private router: Router, private auth: SessionService) { }

  fullScreenToggle(): void {
    if (screenfull.enabled) {
      screenfull.toggle();
    }
  }

  gotoHome() {
    return this.router.navigate(['/']);
  }

  logout() {
    this.auth.logout()
    return this.router.navigate(['/session/signin']);
  }
}
