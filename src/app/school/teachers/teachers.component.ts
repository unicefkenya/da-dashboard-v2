import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SchoolService } from '../school.service';
import { filterOptions } from './options';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

  /// MyTable
  url = 'api/v1/teachers'

  headers = [
    'full_name',
    'username',
    'school_name',
    'tsc_number'
  ]

  // Myform
  formItems: any = filterOptions
  extra_fields: any
  stats_count = 0
  args = {}
  enableOrderBy = true
  formGroupOrder = [
    ['sub_county'],
  ]
  fetchingData = false

  constructor(private schoolService: SchoolService, private route: Router) { }
  currentPage = 'Teacher';
  schools: any;
  rows = [];
  temp = [];
  total = 0;
  pageNumber = 0;
  searching: any;
  loader: any = false;

  ngOnInit() {
    this.getTeachers(1);
  }

  getTeachers(page) {
    this.loader = true;
    this.schoolService.getTeachers(page).subscribe(res => {
      res.results.map((teacher, index) => {

        (page > 1) ? teacher.num = (page * 100) + (index + 1) : teacher.num = index + 1;

        if (teacher.middle_name === null) {
          teacher.name = teacher.full_name //`${teacher.first_name[0].toUpperCase() + teacher.first_name.slice(1)}  ${teacher.last_name[0].toUpperCase() + teacher.last_name.slice(1)}`;
        } else {
          teacher.name = teacher.full_name //`${teacher.first_name[0].toUpperCase() + teacher.first_name.slice(1)} ${teacher.middle_name[0].toUpperCase() + teacher.middle_name.slice(1)}  ${teacher.last_name[0].toUpperCase() + teacher.last_name.slice(1)}`;
        }
        return teacher;
      });
      this.temp = [...res['results']];
      this.rows = res['results'];
      this.total = res.count;
      this.loader = false;
    });

  }

  pageNumberClicked(page) {
    this.getTeachers(page.offset + 1);
  }

  onLengthLoaded(res) {
    this.stats_count = res
  }

  exportTriggerd(event) {
    this.route.navigate(['../reports/downloads']);
  }

  get exportButtonActive() {
    return !this.fetchingData && this.stats_count > 0
  }

  async handleActions(action) {
    if (action.name == "Edit") {
      const data = action.data;
      data.school = { id: data.school, name: data.school_name }
      await this.route.navigate(['../teachers/add-teachers'], { state: data });
    }
  }

  isLoading(status) {
    this.fetchingData = status
  }

  onValidatedData(data) {
    let ignoreFiltersForDecription = ["grouping", "paginator"]
    let parsedFilters = {}
    let descriptions = []
    for (let key in data) {
      const filterValue = data[key]
      if (!filterValue) continue
      if (typeof filterValue == "object") {
        if (filterValue.hasOwnProperty("value")) {
          parsedFilters[key] = filterValue.value
        }
        if (filterValue.hasOwnProperty("details")) {
          for (let index in filterValue.details) {
            const description = filterValue.details[index]
            if (description.hasOwnProperty("description")) {
              if (!ignoreFiltersForDecription.includes(key))
                descriptions.push(description.description)
            }
          }
        }
      } else {
        parsedFilters[key] = filterValue
        if (!ignoreFiltersForDecription.includes(key))
          descriptions.push(`${key}*${filterValue}`)
      }
    }
    if (descriptions.length > 0)
      parsedFilters["descriptions"] = descriptions.join("-")
    this.url = `api/v1/teachers`
    parsedFilters['paginator'] = 'cursor'
    this.args = parsedFilters
    // console.log(parsedFilters)
    // console.log(this.url)
  }

  searchTeacher(name) {
    this.searching = true;
    this.loader = true;
    let page = 1;

    this.schoolService.getSearchedTeacher(page, name).subscribe(res => {
      res.results.map((teacher, index) => {
        (page > 1) ? teacher.num = (page * 100) + (index + 1) : teacher.num = index + 1;
        if (teacher.middle_name === null) {
          teacher.name = `${teacher.first_name[0].toUpperCase() + teacher.first_name.slice(1)}  ${teacher.last_name[0].toUpperCase() + teacher.last_name.slice(1)}`;
        } else {
          teacher.name = `${teacher.first_name[0].toUpperCase() + teacher.first_name.slice(1)} ${teacher.middle_name[0].toUpperCase() + teacher.middle_name.slice(1)}  ${teacher.last_name[0].toUpperCase() + teacher.last_name.slice(1)}`;
        }
        return teacher;
      });
      this.temp = [...res['results']];
      this.rows = res['results'];
      this.total = res.count;
    });
    this.searching = false;
    this.loader = false;

  }

  defaultValues(name) {
    if (name) {
      this.getTeachers(1);
    }
  }

}

