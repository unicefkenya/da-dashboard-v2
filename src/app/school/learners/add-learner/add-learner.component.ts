import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsService } from 'src/app/common/services/constants.service';
import { options } from './options';

@Component({
  selector: 'app-add-learner',
  templateUrl: './add-learner.component.html',
  styleUrls: ['./add-learner.component.scss']
})
export class AddLearnerComponent implements OnInit {

  formItems: any = options;
  url: string = "api/v1/students/"
  extra_fields: any
  originalInstance: any
  formGroupOrder = [
    ['first_name', 'middle_name', 'last_name'],
    ['gender', 'status', 'stream'],
    ['date_enrolled', 'date_of_birth'],
    ['upi', 'admission_no'],
    ['sub_county', 'village'],
    ['distance_from_school', 'cash_transfer_beneficiary'],

    //guardian details
    ['guardian_name', 'guardian_phone'],
    ['guardian_status', 'guardian_sub_county']
  ]
  instance: any

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

  onValidatedData(data: any) {
    console.log(data)
  }

  async onPostedData(data) {
    // TODO
  }

}
