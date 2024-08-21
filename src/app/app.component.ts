import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConstantsService } from './common/services/constants.service';
import { SessionService } from './session/session.service';
import { CookieService } from './core/services/cookie.service';
import { Router } from '@angular/router';
import * as mixpanel from 'mixpanel-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from "@angular/platform-browser";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit{
  constructor(translate: TranslateService, private _constant: ConstantsService, private session: SessionService,
    private cookieService: CookieService, private router: Router,
    private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');

    const rememberMe = this._constant.rememberUser;
    const activeSession = JSON.parse(window.sessionStorage.getItem('activeSession'));

    if (!activeSession && !rememberMe) {
      // console.log('site logged out')
      this.cookieService.deleteCookie('current_user');
      window.localStorage.clear();
    }


    //custom icons
    this.matIconRegistry.addSvgIcon(
      `download`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/download.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `arrow-down`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/arrow-down.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `book`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/book.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `cancel`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/cancel.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `filter`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/filter.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `reset`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/reset.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `report`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/report.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `group`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/group.svg")
    );

    this.matIconRegistry.addSvgIcon(
      `calendar`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/calendar.svg")
    );

  }

  ngOnInit() {
    mixpanel.init('7dc29f10efb7f0aa2a6d9219c12416d3', { debug: false, ignore_dnt: true, track_pageview: false });

    const trackRoute = (route: any) => {
      mixpanel.track('Route Visited', {
        route: route,
      });
    };

    if (environment.production) {
      trackRoute(window.location.pathname);
    }
  }

}
