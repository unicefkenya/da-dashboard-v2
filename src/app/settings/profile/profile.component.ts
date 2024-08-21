import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ConstantsService } from '../../common/services/constants.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService } from 'src/app/shared/notifications/notifications.service';
import { CustomValidators } from 'ng2-validation';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import moment from 'moment';
import { SettingsService } from '../settings.service';

export interface DialogData {
  // classes: any
  // selected_id: any
  // streams: any
  // from_class: any;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    profile: any;
    userRole: any; 
  
    constructor(private _constant: ConstantsService, public dialog: MatDialog,) {}

    ngOnInit() {
      this.profile = this._constant.getUserProfile();
      this.userRole = this._constant.getUserRole();
    }

    editProfileDialog(): void {
      this.dialog.afterAllClosed.subscribe(data=> this.myLoadingFunction() )
      const dialogRef = this.dialog.open(EditProfileDialogComponent, {
        width: '250px',
        data: {},
      });
  
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          
        }
      })
    }

    myLoadingFunction() {
      this.profile = this._constant.getUserProfile();
      console.log(this.profile, 'after dialog closed');
    }

}

// promote to popup
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./profile.component.scss']
})
export class EditProfileDialogComponent implements OnInit{
  selectedId: any;
  profile: any;
  userRole: any;
  public form: FormGroup;
  edit: boolean = false;
  sex:any;
  selected:any;
  @ViewChild('profile_image') profile_image;

  dob = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _constant: ConstantsService,private fb: FormBuilder,
    private notifyService: NotificationsService, private settingsService:SettingsService) {
    // this.selectedId = data.selected_id
    this.form = this.fb.group({
      first_name: [null, Validators.compose([Validators.required])],
      last_name: [null, Validators.compose([Validators.required])],
      // middle_name: [null, Validators.compose([])],
      phone: [null, Validators.compose([])],
      email: [null, Validators.compose([CustomValidators.email])],
      dob: [null, Validators.compose([])],
      gender: [null, Validators.compose([])],
      // country: [null, Validators.compose([])],
      profile_image: [null, Validators.compose([])]
    })
  }


    ngOnInit() {
      this.profile = this._constant.getUserProfile();
      this.userRole = this._constant.getUserRole();
      this.updateForm(this.profile);
      this.sex = [{ gender: 'Male', value: 'M' }, { gender: 'Female', value: 'F' }];
      this.selected = this.profile.gender;

    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    
    this.edit = true;

    
    this.form.value.dob = moment(this.form.value.dob).format('YYYY-MM-DD');

    //To upload the profile image
    // if (this.profile.profile_image !== '' && this.form.value.profile_image === '') {
    //   this.form.value.profile_image = this.profile.profile_image
    // }

    // let formData = new FormData();

    // formData.append('profile_image', this.profile_image.nativeElement.files[0]);

    // this.settingsService.updateImage(formData).subscribe(data => {
    //   // console.log(data, 'successful');
    // },error => {
    //   // console.log(error, 'what is the error on uploading photo?');
    // });
    // console.log(this.form.value, 'what is here?')

    this.settingsService.updateProfile(this.form.value, this.profile.id).subscribe((res)=>{
      // console.log(res);
      this._constant.setUserProfile(res);
      this._constant.getUserProfile();
      this.notifyService.notify('Profile has been successfully updated', 'success');
      this.dialogRef.close();
      
    },
    error => {
      // console.log(error)
      this.notifyService.notify(error, 'error')
    });
    this.edit = false;
  }

  updateForm(data) {
    this.form.setValue({
      first_name: data.first_name,
      // middle_name: data.middle_name,
      last_name: data.last_name,
      gender: data.gender,
      dob: data.dob,
      // country: data.country,
      phone: data.phone,
      email: data.email,
      profile_image: ''
    });
  }

}