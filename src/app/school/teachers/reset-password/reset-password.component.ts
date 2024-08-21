import { Component, OnInit } from '@angular/core'
import { options } from './reset-options'
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  formItems: any = options;
  url: string = "api/v1/users/admin-reset-password/"
  extra_fields: any
  originalInstance: any
  formGroupOrder = [
    ["username"],
    ["new_password"],
  ]


  ngOnInit() {
  }

  onValidatedData(data: any) {
    console.log(data)
  }

  async onPostedData(data) {
    // TODO
    console.log(data)
  }


}
