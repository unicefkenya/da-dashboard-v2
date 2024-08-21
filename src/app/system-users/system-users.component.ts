import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filterOptions } from './options';


@Component({
  selector: 'app-system-users',
  templateUrl: './system-users.component.html',
  styleUrls: ['./system-users.component.scss']
})
export class SystemUsersComponent implements OnInit {


  /// MyTable
  url = "api/v1/users"

  // Myform
  formItems: any = filterOptions
  stats_count = 0
  args = {}
  formGroupOrder = [

  ]
  headers = [
    'id',
    'full_name',
    'username',
    'role_name',
    'email'
  ]

  fetchingData = false
  constructor(private route: Router) { }

  ngOnInit() {
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
      console.log(data, 'system usersss')
      // data.school = { id: data.school, name: data.school_name }
      await this.route.navigate(['../settings/add-system-users'], { state: data });
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
    this.url = `api/v1/users`
    this.args = parsedFilters
    // console.log(parsedFilters)
    // console.log(this.url)
  }

}
