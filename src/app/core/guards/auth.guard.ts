import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SessionService } from '../../session/session.service';
import { ConstantsService } from 'src/app/common/services/constants.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: SessionService,
        private _constant: ConstantsService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const current_user = this.authenticationService.currentUser();
        const rememberMe = this._constant.rememberUser;

        // console.log(current_user, rememberMe, 'here,,,');

        /** Step 1 -> Check if the current user is set */
        /** Step 2 -> Check whehter remember me was set to true */
        /** Step 3 if remember me is set to true send refresh token to api and get the new access token */

        /** Todo: if user is using the app refresh the token after 50 mins */

        if (current_user) {
            // logged in so return true
            // console.log('17: ', current_user)
            // if ( rememberMe ) {
            //    // this.authenticationService.isTokenExpired();
            // } 

            return true;
        }

        // not logged in so redirect to login page with the return url
        // this.router.navigate(['/session/signin'], { queryParams: { returnUrl: state.url } });

        this.router.navigate(['/session/signin']);

        return false;
    }
}

@Injectable({ providedIn: 'root' })
export class NotAdminGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = JSON.parse(localStorage.getItem('user_profile'));
        if (user.role === 'A') {
            this.router.navigate(['']);
            return false;
        }
        return true;
    }
}

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = JSON.parse(localStorage.getItem('user_profile'));
        if (user.role === 'A') {
            return true;
        }
        this.router.navigate(['']);
        return false;
    }
}
