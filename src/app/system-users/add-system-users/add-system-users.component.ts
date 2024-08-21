import { Component, OnInit } from '@angular/core';
import { filterOptions as options } from '../options';

@Component({
  selector: 'app-add-system-users',
  templateUrl: './add-system-users.component.html',
  styleUrls: ['./add-system-users.component.scss']
})
export class AddSystemUsersComponent implements OnInit {
  formItems: any = options;
  url: string = "api/v1/users/"
  extra_fields: any
  originalInstance: any
  formGroupOrder = [
    ['first_name', 'last_name'],
    ['username'],
    ['email'],
    ['role'],
    ['county'],
    ['sub_county'],
    ['school'],
    ['password']
  ]
  instance: any
  constructor() { }
  onValidatedData(data) {

  }
  onPostedData(data) {

  }
  ngOnInit() {
  }

}
