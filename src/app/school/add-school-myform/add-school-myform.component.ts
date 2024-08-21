import { Component, OnInit } from '@angular/core';
import { options } from './options';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseCrudComponent } from 'src/app/shared/components/base-crud.component';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-add-school-myform',
  templateUrl: './add-school-myform.component.html',
  styleUrls: ['./add-school-myform.component.scss']
})
export class AddSchoolMyformComponent extends BaseCrudComponent {

  constructor(public override route: ActivatedRoute, public override router: Router) {
    super(route, router);
  }

  formItems: any = options;
  url: string = "api/v1/schools/"
  extra_fields: any
  routeParamSub?: Subscription;
  formGroupOrder = [
    ['name', 'emis_code'],
    ['phone', 'email'],
    ['location', 'gender'],
    ['sub_county']
  ]


  ngOnInit() {
  }

  onValidatedData(data: any) {
    console.log(data)
  }

  async onPostedData(data) {
    // TODO
  }

  setIntance(event) {
    console.log(event, 'event')
    this.instance = event;
  }


}
