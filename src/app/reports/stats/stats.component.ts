import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filterOptions } from "./options"
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  /// MyTable
  url = 'api/v1/stats/students/id'

  // Myform
  formItems: any = filterOptions
  stats_count = 0
  args = {}
  formGroupOrder = [
    ['report_type', 'grouping', 'paginator'],
    ['school_county', 'school_sub_county', 'gender'],
    ['school']
  ]
  fetchingData = false
  constructor(private route: Router) { }

  ngOnInit() {
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
    this.url = `api/v1/stats/${data.report_type}/${data.grouping}`
    this.args = parsedFilters
    // console.log(parsedFilters)
    // console.log(this.url)
  }

}
