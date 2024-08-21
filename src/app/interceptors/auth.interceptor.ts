import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { ConstantsService } from '../common/services/constants.service'
import { catchError, map } from 'rxjs/operators'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public auth: ConstantsService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.getToken()

    if (token) {
      request = request.clone({
        setHeaders: ({
          'Authorization': 'Bearer ' + token,
          'Accept': 'application/json'
        })
      })
    }

    if (!token) {
      request = request.clone({
        setHeaders: ({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        })
      })
    }

    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // console.log(error.error)

          let errorMessage = ''
          let errorGroup: any = []
          if (!error.url.includes("/auth/token")) {
            return throwError(error)
          }
          if (error.error.detail) {
            errorMessage = error.error.detail

          } else if (error.error.name) {
            errorMessage = error.error.name[0]

          } else if (error.error.error_description) {
            errorMessage = error.error.error_description

          } else {
            console.log(error)
            if (error.status == 0) {
              errorMessage = "Failed, try again later. Make sure you have a working internet connection."
            } else {
              errorMessage = "Make sure you have a working internet connection."
            }
          }

          return throwError(errorMessage)
        })
      )
  }
}
