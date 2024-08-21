import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsService } from 'src/app/common/services/constants.service';
import { options } from './option';

@Component({
  selector: 'app-add-teacher-myform',
  templateUrl: './add-teacher-myform.component.html',
  styleUrls: ['./add-teacher-myform.component.scss']
})
export class AddTeacherMyformComponent implements OnInit {
  formItems: any = options;
  url: string = "api/v1/teachers/"
  extra_fields: any
  originalInstance: any
  formGroupOrder = [
    ['school'],
    ['first_name', 'middle_name', 'last_name'],
    ['phone', 'email'],
    ['type', 'tsc_no',],
    ['streams', 'is_school_admin']
  ]
  instance: any;

  constructor(private route: ActivatedRoute, private router: Router, public commonService: ConstantsService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        const instance = this.router.getCurrentNavigation().extras.state;
        if (instance.hasOwnProperty("id")) {
          this.instance = instance
        }
      }
    })
  }

  ngOnInit() {
  }



  preSendData(data) {
    data["HsPresave"] = true
    return data
  }

  onValidatedData(data: any) {
    console.log(data)
  }

  async onPostedData(data) {
    // Do something
  }

}
