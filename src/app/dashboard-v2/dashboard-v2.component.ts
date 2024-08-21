import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BarGraphYAxis, DataCardModel, DataMapModel } from '@sisitech/charts';
import { Chart, registerables, TooltipItem } from 'chart.js';
import { Subscription, concat } from 'rxjs';
import { ConstantsService } from '../common/services/constants.service';


@Component({
  selector: 'app-dashboard-v2',
  templateUrl: './dashboard-v2.component.html',
  styleUrls: ['./dashboard-v2.component.scss']
})
export class DashboardV2Component implements OnInit {

  dateFilter = {
    start_date: null,
    end_date: null
  }
  statsDuration: any = 180

  myName = 'More Customers'
  myData = [100, 20, 40, 50]

  grouped = true;
  barPercentage = 0.8
  borderWidth = 3
  tension = 0.2

  defaultBarGrahDefault = {
    barPercentage: this.barPercentage,
    tension: this.tension
  }
  enrDataMap = {}
  defaultMaleAttGraphOptions = [
    this.getBarGraphOptions('absent_males', "red"),
    this.getBarGraphOptions('present_males', "blue"),
  ]

  defaultFeMaleAttGraphOptions = [
    this.getBarGraphOptions('present_females', "green"),
    this.getBarGraphOptions('absent_females', "orange"),
  ]

  blueColor = "rgb(32,150,243,0.7)"
  redColor = "rgb(216,3,81,0.9)"

  femaleColor = "#ff10f0"

  defaultCombinedAttGraphOptions = [
    // Blue
    this.getBarGraphOptions('present_percentage', this.blueColor),
    // Red
    this.getBarGraphOptions('absent_percentage', this.redColor),
  ]

  defaultEnrolmentGraphOptions = [
    // Blue
    this.getBarGraphOptions('males', this.blueColor),
    // Red
    this.getBarGraphOptions('females', this.femaleColor),
  ]

  reasonForAbsenceGraphOptions = [
    // Blue
    this.getBarGraphOptions('males', this.blueColor, { barThickness: 20 }),
    // Red
    this.getBarGraphOptions('females', this.femaleColor, { barThickness: 20 }),
  ]

  yAxisFields: BarGraphYAxis[] = [
    ...this.defaultFeMaleAttGraphOptions,
    ...this.defaultMaleAttGraphOptions,
  ]

  attendanceGradeBarGraph: BarGraphYAxis[] = [
    ...this.defaultCombinedAttGraphOptions
  ]
  attendanceCountyBarGraph: BarGraphYAxis[] = [
    ...this.defaultCombinedAttGraphOptions
  ]
  attendanceDefaultBarGraph: BarGraphYAxis[] = [
    this.getBarGraphOptions('present_percentage', this.blueColor),
    // Red
    this.getBarGraphOptions('absent_percentage', this.redColor),
  ]
  attendanceMonthBarGraph: BarGraphYAxis[] = [
    ...this.defaultCombinedAttGraphOptions
  ]



  lineCharAxisFields1: BarGraphYAxis[] = [
    this.getBarGraphOptions('present_females', "green"),
    this.getBarGraphOptions('absent_females', "orange"),
  ]



  lineCharAxisFields: BarGraphYAxis[] = [
    this.getBarGraphOptions('present_males', "grey", { dataKey: "day", ...this.defaultBarGrahDefault }),
    this.getBarGraphOptions('absent_males', "green", { dataKey: "day", ...this.defaultBarGrahDefault }),
  ]

  myGraphType = "doughnut"
  getFirstItemIfArray = false
  cardDetails: DataCardModel[] = [
    { title: '@active_schools#', subtitle: "Active Schools", link: "schools/view-schools", icon: "../assets/images/school.svg", extraModalClasses: "school-class" },
    { title: '@total_learners#', subtitle: "Total Students", link: "students/view-students", icon: "../assets/images/students.svg", extraModalClasses: "student-class" },
    { title: '@students.males#', subtitle: "Male Learners", link: "", icon: "../assets/images/male.svg", extraModalClasses: "male-class" },
    { title: '@students.females#', subtitle: "Female Learners", link: "", icon: "../assets/images/female.svg", extraModalClasses: "female-class" },
    { title: '@students.dropout_males#', subtitle: "Dropout Male Learners", link: "", icon: "../assets/images/male-dropout.svg", extraModalClasses: "dropout-male-class" },
    { title: '@students.dropout_females#', subtitle: "Dropout Female Learners", link: "", icon: "../assets/images/female-dropout.svg", extraModalClasses: "dropout-female-class" },
  ]


  cardDetailsAtt: DataCardModel[] = [
    { title: '@stats.total_range_attendances#', subtitle: "Total Attendances Marked", link: "students/view-students", icon: "../assets/images/attendance.svg", extraModalClasses: "student-class" },
    { title: '@stats.total_att_range_schools#', subtitle: "Schools that Marked Attendance \n (@stats.schools_att_percentage#% of active schools). ", link: "students/view-students", icon: "../assets/images/school.svg", extraModalClasses: "student-class" },

    { title: '@att_county.0.display_name#', subtitle: "Top Active @dynamic_display_name#", link: "schools/view-schools", icon: "../assets/images/top.svg", extraModalClasses: "male-class" },
    { title: '@att_county_least.0.display_name#', subtitle: "Least Active @dynamic_display_name#", link: "schools/view-schools", icon: "../assets/images/bottom.svg", extraModalClasses: "dropout-female-class" },
    // { title: '@students.males#', subtitle: "Top Active County", link: "", icon: "../assets/images/top.svg", extraModalClasses: "male-class" },
    // { title: '@students.females#', subtitle: "Least Active County", link: "", icon: "../assets/images/bottom.svg", extraModalClasses: "dropout-female-class" },
  ]

  cardDetailsEnrl: DataCardModel[] = [
    { title: '@stats.total_range_students#', subtitle: "Total Enrolment", link: "schools/view-schools", icon: "../assets/images/add-user.svg", extraModalClasses: "school-class" },
    { title: '@stats.total_range_schools#', subtitle: "Schools that Enrolled Learners", link: "students/view-students", icon: "../assets/images/school.svg", extraModalClasses: "student-class" },
    { title: '@enr_county.0.display_name#', subtitle: "Top Active @dynamic_display_name#", link: "", icon: "../assets/images/top.svg", extraModalClasses: "male-class" },
    { title: '@enr_county_least.0.display_name#', subtitle: "Least Active @dynamic_display_name#", link: "", icon: "../assets/images/bottom.svg", extraModalClasses: "dropout-female-class" },
  ]

  dataMap: DataMapModel = {

  }

  card
  routeSub?: Subscription
  shouldReload = false
  user: any

  role_map_endoint = {
    "SCHA": "stream",
    "SCHT": "stream",
    "SCO": "school",
    "CO": "sub-county",
    "A": "county",
  }

  durationsMap = [
    { value: 7, display_name: "1 Week Ago" },
    { value: 14, display_name: "2 Weeks Ago" },
    { value: 30, display_name: "1 Month Ago" },
    { value: 90, display_name: "3 Months Ago" },
    { value: 180, display_name: "6 Months Ago" },
    { value: 365, display_name: "1 Year Ago" },
  ]

  role_map_display_key = {
    "SCHA": "stream_name",
    "SCHT": "stream_name",
    "SCO": "school_name",
    "CO": "sub_county_name",
    "A": "county_name",
  }
  role_map_query_params = {
    "SCHA": { "order_by": "base_class", "order": "ASC" },
    "SCHT": { "order_by": "base_class", "order": "ASC" },
    "SCO": {},
    "CO": {},
    "A": {},
  }

  constructor(private route: ActivatedRoute, private _constant: ConstantsService, private router: Router) {
    Chart.register(...registerables);
  }

  ngOnDestroy() {
    this.routeSub?.unsubscribe()
  }


  getXDisplayFieldName(): string {
    const path = this.role_map_display_key[this.user.role] ?? "N/A aa"
    // console.log(`Found path is ${path}`)
    return path
  }

  getRoleMapEndoint(): string {
    const path = this.role_map_endoint[this.user.role]
    // console.log(`Found path is ${path}`)
    return path
  }

  getRoleExtraFilter(): any {
    return this.role_map_query_params[this.user.role]
  }

  getDynamicRoleType() {
    const preText = ""
    return `${preText} ${this.getRoleMapEndoint().capitalizeEachWord()}`
  }

  getSelectedDispaly() {
    return this.durationsMap.filter(item => item.value == this.statsDuration)[0].display_name
  }


  xScaleAxisExtraOptions = {
    ticks: {
      font: {
        family: "Prompt-Regular"
      },
    }
  }

  xAxisExtraOptions = {
    font: {
      size: 12,
      family: "Prompt-Regular"
    },
  }

  titleExtraOptions = {
    font: {
      size: 16,
      weight: 400,
      family: 'Prompt-Semibold',
      lineHeight: 1,
    },
    layout: {
      padding: 5
    }
  }

  subtitleExtraOptions = {
    font: {
      size: 13,
      family: 'Prompt-Regular',
    },
    layout: {
      padding: 30
    }
  }

  legendExtraOptions = {
    font: {
      size: 9,
      family: 'Prompt-Regular',
    },
  }

  ngOnInit(): void {
    this.routeSub = this.route.queryParams.subscribe((params) => {
      if (params.hasOwnProperty("stats_duration")) {
        console.log(params)
        let newDuration = parseInt(params.stats_duration)
        console.log("Change detected.")
        this.statsDuration = parseInt(params.stats_duration)
        const reload = localStorage.getItem("reload")
        console.log("Reload", reload)
        if (reload == "true") {
          localStorage.setItem("reload", "false")
          window.location.reload();
        }

      }
    })

    this.user = this._constant.getUserProfile()

    this.setupDashboardV2DataModels()

    // this.setupDataModel()
  }

  attCardsPreChartData(data, rawData) {
    let getDynamicFieldName = (item: any) => {
      if (item.hasOwnProperty("stream_name")) {
        return "stream_name"
      } else if (item.hasOwnProperty("school_name")) {
        return "school_name"
      } else if (item.hasOwnProperty("sub_county_name")) {
        return "sub_county_name"
      } else if (item.hasOwnProperty("county_name")) {
        return "county_name"
      }
      return ""
    }
    let getDynamicFieldDisplayName = (item: any) => {
      return item[getDynamicFieldName(item)]
    }

    data.att_county_least = data.att_county_least.filter(dt => dt.value != null).map(item => {
      item.display_name = getDynamicFieldDisplayName(item)
      return item
    })

    data.att_county = data.att_county.filter(dt => dt.value != null).map(item => {
      item.display_name = getDynamicFieldDisplayName(item)
      return item
    })

    data.stats.total_range_attendances = data.att_gender.reduce((prev, current) => prev + current.total_attendances_taken, 0)
    data.stats.total_att_range_schools = rawData.att_school.data.count ?? 0

    // console.log(data)
    const firstItem = data.att_county_least[0]
    data.dynamic_display_name = getDynamicFieldName(firstItem).replace("_name", "").capitalizeEachWord()

    const total_schools = data.stats.active_schools
    if (total_schools > 0) {
      let value = Math.round(data.stats.total_att_range_schools * 100.0 / total_schools)
      data.stats.schools_att_percentage = value < 1 ? "less than 1" : value
    } else {
      data.stats.schools_att_percentage = 0
    }


    console.log(data)
    console.log(rawData)
    return data
  }
  enrollCardsPreChartData(data, rawData) {
    let getDynamicFieldName = (item: any) => {
      if (item.hasOwnProperty("stream_name")) {
        return "stream_name"
      } else if (item.hasOwnProperty("school_name")) {
        return "school_name"
      } else if (item.hasOwnProperty("sub_county_name")) {
        return "sub_county_name"
      } else if (item.hasOwnProperty("county_name")) {
        return "county_name"
      }
      return ""
    }
    let getDynamicFieldDisplayName = (item: any) => {
      return item[getDynamicFieldName(item)]
    }


    data.enr_county_least = data.enr_county_least.filter(dt => dt.value != null).map(item => {
      item.display_name = getDynamicFieldDisplayName(item)
      return item
    })

    data.enr_county = data.enr_county.filter(dt => dt.value != null).map(item => {
      item.display_name = getDynamicFieldDisplayName(item)
      return item
    })

    data.stats.total_range_students = data.enr_gender.reduce((prev, current) => prev + current.total_students, 0)
    data.stats.total_range_schools = rawData.enr_school.data.count ?? 0

    const firstItem = data.att_county_least[0]
    data.dynamic_display_name = getDynamicFieldName(firstItem).replace("_name", "").capitalizeEachWord()



    return data
  }

  attendanceCombinedPreChartData(data: any) {
    if (!data) return data
    data.map(grade => {
      grade.present = grade.present_males + grade.present_females
      grade.absent = grade.absent_males + grade.absent_females
      return grade
    })
    return data
  }

  attendancePercentageCombinedPreChartData(dataPoints: any[]) {
    if (!dataPoints) return dataPoints
    dataPoints.map(grade => {
      let total = grade.present + grade.absent
      grade.present_percentage = Math.round(grade.present * 100.0 / total)
      grade.absent_percentage = Math.round(grade.absent * 100.0 / total)
      return grade
    })
    return dataPoints
  }

  gradeNameAppendPreChartData(data: any) {
    if (!data) return data
    data.map(grade => {
      let class_type = parseInt(grade.class_name) < 7 ? "Grade" : "Class"
      grade.class_name = `${class_type} ${grade.class_name}`
      return grade
    })
    return data
  }

  streamNameAppendPreChartData(data: any) {
    if (!data) return data
    data.map(grade => {
      if (grade.hasOwnProperty("stream_name")) {

        let class_type = parseInt(grade.stream_name[0]) < 7 ? "Grade" : "Class"
        grade.stream_name = `${class_type} ${grade.stream_name}`
      }

      return grade
    })
    return data
  }


  monthNamePreChartData(datas: any) {
    if (!datas) return datas
    datas.map((data: any) => {
      data.month = new Date(data.month).toLocaleString('default', { year: 'numeric', month: 'long' })
      return data
    })
    return datas.filter((grd: any) => grd.value != null)
  }

  removeNullValuePreChartData(data: any) {
    if (!data) return data
    return data.filter(grd => grd.value != null)
  }

  preChartDataCard(data) {

    data.total_learners = data.students.males + data.students.females
    return data
  }
  addAllClassesData(data: any[]) {
    if (!data) return data
    console.log(data)
    const res = { "total_attendances_taken": data.reduce((prev, current) => prev + current.total_attendances_taken, 0) }
    console.log(res)
    return res
  }

  getBarGraphOptions(fieldName, backgroundColor, extras = {}) {
    return {
      fieldName: fieldName,
      backgroundColor: backgroundColor,
      barThickness: undefined,
      borderWidth: 1,
      grouped: this.grouped,
      barPercentage: this.barPercentage,
      ...extras
    }
  }

  getDataCardOptions() {

  }


  titleTooltipFuncDay(context: TooltipItem<"bar">, row: any) {
    // console.log(context, row)
    return "Hello"
  }
  titleTooltipFunc(context: TooltipItem<"bar">, row: any) {
    console.log(context)
    return "@county_name - @sub_county_name#".interpolate({ ...row }).capitalizeEachWord()
  }

  thisMonth: DataCardModel[] = [
    {
      title: '@county.0.county_name# (@county.0.total_attendances_taken#)',
      subtitle: "Top COunty in Data Collection",
      link: "",
      icon: "",
      extraModalClasses: "12323"
    },
    {
      title: '@school.0.school_name# (@school.0.total_attendances_taken#)',
      subtitle: "Top SChool in Data Collection",
      link: "",
      icon: "",
      extraModalClasses: ""
    },
    // { title: '@active_schools#', subtitle: "Active SChools" },
    // { title: '@students.females#', subtitle: "Female learners" },
    // { title: '@students.males#', subtitle: "Male learners" },
    // { title: '@students.dropout_males#', subtitle: "Dropout Male learners" },
  ]
  getDateXDaysAgo(x) {
    const currentDate = new Date();
    const pastDate = new Date(currentDate);
    pastDate.setDate(currentDate.getDate() - x);
    // Format the date as "yyyy-mm-dd"
    const formattedDate = pastDate.toISOString().slice(0, 10);
    return formattedDate;
  }

  routeToNewPage() {
    localStorage.setItem("reload", "true")
    this.router.navigate(["/",], { queryParams: { stats_duration: this.statsDuration, } })
  }

  setupDashboardV2DataModels() {
    console.log("Fethcing data..")
    // let default_args = { "start_date": "2023-01-01", "end_date": "2023-11-30", "page_size": 5 }
    let start_date = this.getDateXDaysAgo(this.statsDuration)
    let default_args = { "start_date": start_date, "page_size": 13, "is_training_school": false }
    let default_attandance_args = { "order_by": "total_attendances_taken", "order": "DESC" }
    let default_enrolment_args = { "order_by": "total_students", "order": "DESC" }
    let attendance_base_url = "api/v1/attendances/stats"
    let enrollment_base_url = "api/v1/students/stats"
    let absence_reason_base_url = "api/v1/students-absent-reasons/stats"
    let date_from = `From date ${start_date} `

    this.dataMap["stats"] = {
      name: "stats",
      url: "api/v1/statistics",
      data: null,
      error: null,
      args: {},
      description: "Overral stats"
    }

    this.dataMap["att_grade"] = {
      name: "att_grade",
      url: `${attendance_base_url}/class`,
      data: null,
      error: null,
      args: { ...default_args, "order_by": "class_name", "order": "ASC" },
      description: date_from
    }
    this.dataMap["att_gender"] = {
      name: "att_gender",
      url: `${attendance_base_url}/gender`,
      data: null,
      error: null,
      args: { ...default_args, },
      description: date_from
    }

    this.dataMap["att_school"] = {
      name: "att_school",
      url: `${attendance_base_url}/school`,
      data: null,
      error: null,
      args: { ...default_args, ...default_attandance_args },
      description: date_from
    }


    this.dataMap["att_county"] = {
      name: "att_county",
      url: `${attendance_base_url}/${this.getRoleMapEndoint()}`,
      data: null,
      error: null,
      args: { ...default_attandance_args, ...default_args, ...this.getRoleExtraFilter() },
      description: date_from
    }

    this.dataMap["att_county_least"] = {
      name: "att_county",
      url: `${attendance_base_url}/${this.getRoleMapEndoint()}`,
      data: null,
      error: null,
      args: { ...{ "order_by": "total_attendances_taken", "order": "ASC" }, ...default_args, ...this.getRoleExtraFilter() },
      description: date_from
    }

    this.dataMap["att_month"] = {
      name: "att_month",
      url: `${attendance_base_url}/month`,
      data: null,
      error: null,
      args: { ...default_attandance_args, ...default_args, "order_by": "month", "order": "ASC" },
      description: date_from
    }

    this.dataMap["att_lwd"] = {
      name: "att_month",
      url: `${attendance_base_url}/special-need`,
      data: null,
      error: null,
      args: { ...default_attandance_args, ...default_args },
      description: date_from
    }

    this.dataMap["att_lwd_grade"] = {
      name: "att_lwd_grade",
      url: `${attendance_base_url}/class`,
      data: null,
      error: null,
      args: { ...default_args, no_special_needs: false, "order_by": "class_name", "order": "ASC" },
      description: date_from
    }

    this.dataMap["att_lwd_county"] = {
      name: "att_lwd_county",
      url: `${attendance_base_url}/${this.getRoleMapEndoint()}`,
      data: null,
      error: null,
      args: { ...default_args, ...default_attandance_args, no_special_needs: false, ...this.getRoleExtraFilter() },
      description: date_from
    }


    this.dataMap["enr_month"] = {
      name: "enr_month",
      url: `${enrollment_base_url}/month`,
      data: null,
      error: null,
      args: { ...default_args, ...default_enrolment_args, "order_by": "month", "order": "ASC" },
      description: date_from
    }

    this.dataMap["enr_grade"] = {
      name: "enr_grade",
      url: `${enrollment_base_url}/class`,
      data: null,
      error: null,
      args: { ...default_args, ...default_enrolment_args, "order_by": "class_name", "order": "ASC" },
      description: date_from
    }
    this.dataMap["enr_gender"] = {
      name: "enr_gender",
      url: `${enrollment_base_url}/gender`,
      data: null,
      error: null,
      args: { ...default_args, },
      description: date_from
    }

    this.dataMap["enr_school"] = {
      name: "enr_school",
      url: `${enrollment_base_url}/school`,
      data: null,
      error: null,
      args: { ...default_args, ...default_enrolment_args },
      description: date_from
    }

    this.dataMap["enr_county"] = {
      name: "enr_county",
      url: `${enrollment_base_url}/${this.getRoleMapEndoint()}`,
      data: null,
      error: null,
      args: { ...default_args, ...default_enrolment_args, ...this.getRoleExtraFilter() },
      description: date_from
    }

    this.dataMap["enr_county_least"] = {
      name: "enr_county_least",
      url: `${enrollment_base_url}/${this.getRoleMapEndoint()}`,
      data: null,
      error: null,
      args: { ...default_args, ...{ "order_by": "total_students", "order": "ASC" }, ...this.getRoleExtraFilter() },
      description: date_from
    }

    this.dataMap["enr_lwd"] = {
      name: "enr_lwd",
      url: `${enrollment_base_url}/special-need`,
      data: null,
      error: null,
      args: { ...default_args, ...default_enrolment_args },
      description: date_from
    }

    this.dataMap["enr_lwd_grade"] = {
      name: "enr_lwd_grade",
      url: `${enrollment_base_url}/class`,
      data: null,
      error: null,
      args: { ...default_args, ...default_enrolment_args, no_special_needs: false, "order_by": "class_name", "order": "ASC" },
      description: date_from
    }
    this.dataMap["enr_lwd_county"] = {
      name: "enr_lwd_grade",
      url: `${enrollment_base_url}/${this.getRoleMapEndoint()}`,
      data: null,
      error: null,
      args: { ...default_args, ...default_enrolment_args, no_special_needs: false, ...this.getRoleExtraFilter() },
      description: date_from
    }


    this.dataMap["absence_reason"] = {
      name: "absence_reason",
      url: `${absence_reason_base_url}/reason`,
      data: null,
      error: null,
      args: { ...default_args, no_special_needs: false },
      description: date_from
    }
  }


  formatLabel(ob: any, fieldName: string) {
    // return Date.parse(ob[fieldName])
    // return `@${fieldName}#`.interpolate(ob).toDateDisplay()
    let day = `@${fieldName}#`.interpolate(ob)

    return `Date ${day.split("-")[2]}`
    return fieldName.interpolate(ob)
  }

}
