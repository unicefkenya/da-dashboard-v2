import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, range, throwError } from 'rxjs'
import { HttpClient,HttpErrorResponse, HttpInterceptor, HttpRequest } from '@angular/common/http'
import * as moment from 'moment'
import { AbstractControl } from '@angular/forms';

const endpoint = environment.APIv1Endpoint 

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private years: any
  private months: any = []
  constructor(private http: HttpClient) { }

   // TODO: need to refactor logic   
   getFirstDayofYears(year:number = 1900){

    this.years = []
    let this_year = moment().year()
    
    for (let count = year; count <= +this_year; count++){
      
      let year_day_one = {
        name: count, value: count+'-01-01'
      }
      
      this.years.push(year_day_one)
    }
    return this.years
  }

  getFirstDayofMonths(){
    const months = moment.months()
    let this_year = moment().year()

    for(let count = 0; count < months.length; count++){
      
      this.months.push(
        {
          name: months[count] , value: this_year+'-01-01'
        }
      )
    }
    return this.months
  }

  getRegions(): Observable<any> {
    return this.http.get<any>(endpoint+('regions/'))
  }

  getDistricts(query: string = ''): Observable<any> {
    return this.http.get<any>(endpoint+('districts/?'+query))
  }

  getVillages(query: string=''): Observable<any> {
    return this.http.get<any>(endpoint+('villages/?'+query))
  }

  // capitalize first letter
  jsUcfirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  
  confirmPasswordValidator(AC: AbstractControl) {
   let password = AC.get('new_password').value; // value of the new password
   let confirmPassword = AC.get('c_password').value; // value of the confirm password
    if(password != confirmPassword) {
      AC.get('c_password').setErrors( {MatchPassword: true} )
    } else {
        //console.log('true');
        return null
    }
  }
  
  public errorHandler(err: HttpErrorResponse) {
    
    // if (err.status === 401) {
    //   console.log('handled error ' + err.error);
    //   return of(err.error);
    // } 
    // return throwError(err);

    if (err.error instanceof Error) {
      console.log('An error occurred:', err.error.message);
      return err.error.message;
    } else {
      console.log (`Backend returned code ${err.status}, body was ${err.error}`);
      return err.error;
    }

  }
}
