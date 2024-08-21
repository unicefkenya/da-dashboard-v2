import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import {  from as fromPromise, Observable } from 'rxjs';
import { SharedService } from '../shared/shared.service';
import { ConstantsService } from '../common/services/constants.service';

const endpoint = environment.APIv1Endpoint 
@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient, private sharedService: SharedService, private _constant: ConstantsService) { }

  changePassword(data):Observable<any> {
    return this.http.put<any>(endpoint + 'users/me/change-password', data)
  }

  updateProfile(data, id): Observable<any> {
    return this.http.patch<any>(endpoint + 'users/me/profile/', data);
  }

  updateImage(data): Observable<any> {

    return fromPromise(new Promise((resolve, reject) => {
      
      const url = endpoint + 'users/me/profile/';

      let token= this._constant.getToken();

      let xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                  resolve(JSON.parse(xhr.response) as any);
              } else {
                  reject(xhr.response)
              }
          }
      }
      xhr.open("PATCH", url, true);
      xhr.setRequestHeader("Authorization", "Bearer " + token);
      xhr.send(data);
      }))
  }
}
