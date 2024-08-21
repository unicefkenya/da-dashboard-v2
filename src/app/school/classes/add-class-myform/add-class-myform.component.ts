import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsService } from 'src/app/common/services/constants.service';
import { options } from './options';

@Component({
  selector: 'app-add-class-myform',
  templateUrl: './add-class-myform.component.html',
  styleUrls: ['./add-class-myform.component.scss']
})
export class AddClassMyformComponent implements OnInit {

  formItems: any = options;
  url: string = "api/v1/streams/"
  extra_fields: any
  originalInstance: any
  formGroupOrder = [
    ['school'],
    ['base_class'],
    ['name'],
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

  getUserProfile() {


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
