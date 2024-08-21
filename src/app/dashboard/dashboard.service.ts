import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import * as moment from 'moment'

const endpoint = environment.APIv1Endpoint

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private http: HttpClient) { }

    user_profile = this.getUser()

    getStatistics(query: string = ''): Observable<any> {
        return this.http.get<any>(endpoint + 'statistics/' + query)
    }

    getEnrolments(query: string = ''): Observable<any> {
        return this.http.get<any>(endpoint + 'students/enrolls/' + query + '?paginator=cursor')
    }

    getAttendance(query: string = ''): Observable<any> {
        if (query == 'daily') {
            const startdate = moment().subtract(5, "days")
            query = 'day?start_date=' + moment(startdate).format('YYYY-MM-DD') + '&order_by=value&paginator=cursor'
            return this.http.get<any>(endpoint + 'attendances/stats/' + query)
        } else if (query == 'monthly') {
            const startdate = moment().subtract(3, "months").format('YYYY-MM-DD')

            query = 'month' + '?order_by=value&paginator=cursor&start_date=' + startdate
            return this.http.get<any>(endpoint + 'attendances/stats/' + query)

        } else {
            const startdate = moment().subtract(12, "months").format('YYYY-MM-DD')
            query = query + `?order_by=value&paginator=cursor&start_date=${startdate}`
            return this.http.get<any>(endpoint + 'attendances/stats/' + query)
        }
    }

    getUser() {
        return JSON.parse(localStorage.getItem('user_profile'))
    }

}
