import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filterOptions } from './options';

@Component({
  selector: 'app-view-learner',
  templateUrl: './view-learner.component.html',
  styleUrls: ['./view-learner.component.scss']
})
export class ViewLearnerComponent implements OnInit {

  /// MyTable
  url = 'api/v1/students/stats/id'

  // Myform
  formItems: any = filterOptions
  stats_count = 0
  args = {}
  enableOrderBy = true
  headersOrder = ["full_name", "school_name", "county_name", "sub_county_name", "class", "admission_number", "upi", "gender", "student_status", "date_of_birth"]
  formGroupOrder = [
    ['grouping', 'paginator'],
    ['school_county', 'school_sub_county', 'gender'],
    ['school', 'base_class', 'status']
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
      // data.school = { id: data.school, name: data.school_name }
      await this.route.navigate(['../students/add-student'], { state: data });
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
    this.url = `api/v1/students/stats/${data.grouping}`
    this.args = parsedFilters
    // console.log(parsedFilters)
    // console.log(this.url)
  }

}
