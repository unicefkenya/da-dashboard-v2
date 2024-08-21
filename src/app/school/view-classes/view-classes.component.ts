import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SchoolService } from '../school.service';

@Component({
  selector: 'app-view-classes',
  templateUrl: './view-classes.component.html',
  styleUrls: ['./view-classes.component.scss']
})
export class ViewClassesComponent implements OnInit {
  currentPage = 'class';
  rows = [];
  temp = [];
  total = 0;
  pageNumber = 0;
  searching: any;
  loader: any = false;

  headers = [
    'full_class_name'
  ]

  columns = [
    { name: '#', prop: 'num' },
    { name: 'Class', prop: 'base_class' },
    { name: 'Stream', prop: 'name' },
    { name: 'Last Attentance', prop: 'last_attendance' },
  ];
  constructor(public schoolService: SchoolService, private route: Router) { }

  ngOnInit() {
    this.getClasses(1);
  }

  getClasses(page) {
    this.loader = true;
    this.schoolService.getClasses(page).subscribe(res => {
      res.results = res.results.map((data, index) => {
        if (!data.name) { data.name = '_'; }
        if (!data.last_attendance) { data.last_attendance = '_'; }
        (page > 1) ? data.num = (page * 100) + (index + 1) : data.num = index + 1;
        return data;
      });
      this.rows = res.results;
      this.total = res.count;
      this.loader = false;
    });
  }

  pageNumberClicked(page) {
    this.getClasses(page.offset + 1);
  }

  searchClass(name) {
    this.searching = true;
    this.loader = true;
    let page = 1;

    this.schoolService.getSearchedClass(page, name).subscribe(res => {
      res.results = res.results.map((data, index) => {
        if (!data.name) { data.name = '_'; }
        if (!data.last_attendance) { data.last_attendance = '_'; }
        (page > 1) ? data.num = (page * 100) + (index + 1) : data.num = index + 1;
        return data;
      });
      this.rows = res.results;
      this.total = res.count;
      this.loader = false;
    });

    this.searching = false;


  }

  async handleActions(action) {
    if (action.name == "Edit") {
      const data = action.data;
      console.log(data, 'classes')
      // id and name are what the multiselect expects for update
      data.school = { id: data.school, name: data.school_name }
      await this.route.navigate(['../classes/add-class'], { state: data });
    }
  }

  exportTriggerd(event) {
    this.route.navigate(['../reports/downloads']);
  }


  defaultValues(name) {
    if (name) {
      this.getClasses(1);
    }
  }
}
