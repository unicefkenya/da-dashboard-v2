import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const endpoint = environment.APIv1Endpoint;

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient) { }

  getUser() {
    // to be removed when @micha implements user check based on token
    return JSON.parse(localStorage.getItem('user_profile'));
  }

  getSchools(page): Observable<any> {
    return this.http.get<any>(endpoint + 'schools/?page_size=100&page=' + page);
  }

  getSearchedSchool(page, name) {
    return this.http.get<any>(endpoint + 'schools/?page_size=100&page=' + page + '&name=' + name);
  }

  getTeachers(page): Observable<any> {
    const user = this.getUser();
    const school = user.role === 'A' ? '' : '&school=' + user.school;
    return this.http.get<any>(endpoint + 'teachers?page_size=100&page=' + page + school + '&paginator=standard');
  }

  getSearchedTeacher(page, name) {
    const user = this.getUser();
    const school = user.role === 'A' ? '' : '&school=' + user.school;
    return this.http.get<any>(endpoint + 'teachers/?page_size=100&page=' + page + '&name=' + name + school);
  }

  addSchools(data): Observable<any> {
    return this.http.post<any>(endpoint + 'schools/', data);
  }

  addClass(data): Observable<any> {
    return this.http.post<any>(endpoint + 'streams/', data);
  }

  addStudent(data): Observable<any> {
    return this.http.post<any>(endpoint + 'students/', data);
  }

  addTeacher(data): Observable<any> {
    return this.http.post<any>(endpoint + 'teachers/', data);
  }

  promoteSchool(data, url): Observable<any> {
    return this.http.post<any>(endpoint + url + '/', data);
  }

  getStudents(page, gender) {
    const user = this.getUser();
    const school = user.role === 'A' ? '' : '&school=' + user.school;
    if (gender === 'none') {
      return this.http.get<any>(`${endpoint}students/?page_size=100&page=${page}&active=true${school}`);
    } else if (gender === 'boys') {
      return this.http.get<any>(`${endpoint}students/?page_size=100&page=${page}&active=true&gender=M${school}`);
    } else if (gender === 'girls') {
      return this.http.get<any>(`${endpoint}students/?page_size=100&page=${page}&active=true&gender=F${school}`);
    }
  }
  getSearchedStudent(page, name) {
    const user = this.getUser();
    const school = user.role === 'A' ? '' : '&school=' + user.school;
    return this.http.get<any>(endpoint + 'students/?page_size=100&page=' + page + '&name=' + name + school);
  }

  getDropoutStudents(page) {
    return this.http.get<any>(endpoint + 'students/dropouts/?page_size=100&page=' + page);
  }

  resetTeacherPassword(data): Observable<any> {
    return this.http.put<any>(endpoint + 'users/admin-reset-password/', data);
  }

  getClasses(page): Observable<any> {
    const user = this.getUser();
    const school = user.role === 'A' ? '' : '&school=' + user.school;
    return this.http.get<any>(endpoint + 'streams/?page_size=100&page=' + page + school);
  }

  getSearchedClass(page, name): Observable<any> {
    const user = this.getUser();
    const school = user.role === 'A' ? '' : '&school=' + user.school;
    return this.http.get<any>(endpoint + 'streams/?page_size=100&page=' + page + school + '&name=' + name);
  }

  updateStudent(data, id): Observable<any> {
    return this.http.put<any>(endpoint + 'students/' + id + '/', data);
  }

  moveStudents(data): Observable<any> {
    return this.http.put<any>(endpoint + 'students/bulk' + '/', data);
  }

  updateTeacher(data, id): Observable<any> {
    return this.http.put<any>(endpoint + 'teachers/' + id + '/', data);
  }

  updateClass(data, id): Observable<any> {
    return this.http.put<any>(endpoint + 'streams/' + id + '/', data);
  }

  updateSchool(data, id): Observable<any> {
    return this.http.put<any>(endpoint + 'schools/' + id + '/', data);
  }

  getSingleItem(name, id) {
    return this.http.get<any>(`${endpoint + name}/${id}/`);
  }

  getStudentDeleteReasons() {
    return this.http.get<any>(`${endpoint}students-delete-reasons/`);
  }

  fetchChildAttendance(id, month: any = '') {
    return this.http.get<any>(endpoint + 'attendances/yearly/?student=' + id + '&month=' + month);
  }

  fetchWeeklyAttendance(id) {
    return this.http.get<any>(endpoint + 'attendances/weekly/?student=' + id);
  }

  filter(url) {
    return this.http.get<any>(`${endpoint + url}`);
  }

  delete(url) {
    return this.http.delete<any>(`${endpoint + url}`);
  }
}
