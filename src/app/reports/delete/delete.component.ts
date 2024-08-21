import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filterOptions } from './options';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  /// MyTable
  url = 'api/v1/students-delete-reasons/stats/id'

  // Myform
  formItems: any = filterOptions
  stats_count = 0
  args = {}
  enableOrderBy = true
  headersOrder = ["full_name", "school_name", "county_name", "sub_county_name", "class", "admission_number", "upi", "gender", "student_status", "date_of_birth"]
  formGroupOrder = [
    ['grouping', 'paginator'],
    ['county_id', 'sub_county_id'],
    ['school_id', 'base_class', 'reason'],
    ['start_recorded_date', 'end_recorded_date'],
  ]
  fetchingData = false
  collapseFilters = false
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  downloadsActions(event) {
  }

  onLengthLoaded(res) {
    this.stats_count = res
  }

  exportTriggerd(event) {
    this.route.navigate(['/reports/downloads']);
  }

  get exportButtonActive() {
    return !this.fetchingData && this.stats_count > 0
  }

  isLoading(status) {
    this.fetchingData = status
  }

  handleActions(event) {
  }

  onValidatedData(data) {
    let ignoreFiltersForDecription = ["report_type", "grouping", "paginator"]
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
    this.url = `api/v1/students-delete-reasons/stats/${data.grouping}`
    this.args = parsedFilters
    // console.log(parsedFilters)
    // console.log(this.url)
  }

}
