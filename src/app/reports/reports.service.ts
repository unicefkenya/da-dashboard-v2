import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map,mergeMap } from 'rxjs/operators';

const endpoint = environment.APIv1Endpoint;

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) {}

  getSchoolCoordinates(): Observable<any> {
    return this.http.get<any>(endpoint + 'attendances/school').pipe(
      mergeMap(val => {
        
        return this.http.get<any>(endpoint + 'students/enrolls/school').pipe(
          map(res => {
            val.results.enrolls = res.results;
            return val
          })
        );
      })
    )
  }
}
