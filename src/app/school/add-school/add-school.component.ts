import { Component, OnInit, Input, Directive } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms'
import { CustomValidators } from 'ng2-validation'
import { SchoolService } from '../school.service'
import { NotificationsService } from 'src/app/shared/notifications/notifications.service'
import { SharedService } from 'src/app/shared/shared.service'
import { Router, ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.scss']
})
export class AddSchoolComponent implements OnInit {

  public form: FormGroup;
  public months: any;
  public villages: any = [];
  public districts: any = [];
  public regions: any = [];
  public ownership: any;
  public location: any;
  public timings: any;
  public classes: any;
  public years: any;
  public ownership_status = false;
  school: any;
  update: boolean;
  loading = false;
  error: any = '';
  hideRegion = false;

  constructor(private fb: FormBuilder, private schoolService: SchoolService, public activatedRoute: ActivatedRoute,
    private notifyService: NotificationsService, private sharedService: SharedService, private router: Router) {

    this.years = this.sharedService.getFirstDayofYears()
    this.months = this.sharedService.getFirstDayofMonths()
    this.ownership = ['Public', 'Community', 'Private', 'Other']
    this.location = [
      { name: 'Urban', value: 'U' },
      { name: 'Rural', value: 'R' }
    ]
    this.timings = [
      { value: 'D', name: 'Day school only' },
      { value: 'B', name: 'Boarding school only' },
      { value: 'DB', name: 'Day and boarding school' }
    ]

    this.classes = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8']
  }

  ngOnInit() {
    this.form = this.fb.group({
      emis_code: [null, Validators.compose([Validators.required])],
      name: [null, Validators.compose([Validators.required])],
      region: new FormControl('', Validators.required),
      district: new FormControl(null, Validators.required),
      village: new FormControl('4', Validators.required),
      phone: [null, Validators.compose([])],
      email: [null, Validators.compose([CustomValidators.email])],
      school_ministry: [null, Validators.compose([])],
      founder_name: [null, Validators.compose([])],
      former_school_name: [null, Validators.compose([])],
      year_of_foundation: [null, Validators.compose([Validators.required])],
      ownership: [null, Validators.compose([])],
      other_owner: [null, Validators.compose([])],
      location: [null, Validators.compose([Validators.required])],
      lat: [null, Validators.compose([])],
      lng: [null, Validators.compose([])],
      start_of_calendar: [null, Validators.compose([Validators.required])],
      end_of_calendar: [null, Validators.compose([Validators.required])],
      lowest_grade: ['P1', Validators.compose([Validators.required])],
      highest_grade: ['P8', Validators.compose([Validators.required])],
      schooling: [null, Validators.compose([Validators.required])],
    })

    this.activatedRoute.queryParams
      .subscribe(params => {
        if (Object.entries(params).length > 1) {
          this.update = true;
          this.getSchool(params.school);
        } else {
          this.update = false;
          this.villages = [];
          this.districts = [];
          this.form.reset();
          this.form.get('village').disable();
          this.form.get('district').disable();
        }
      });

    this.getRegions();
    this.formChangeSubscription();
  }



  formChangeSubscription() {
    this.form.get('region').valueChanges.subscribe(
      region => {
        if (region != null) {
          this.getDistricts(region);
          this.form.get('district').setValue('');
          this.form.get('district').enable();
          this.form.get('village').disable();
        }
      });

    this.form.get('district').valueChanges.subscribe(
      district => {
        if (district != null) {
          this.getVillages(district);
          this.form.get('village').setValue('');
          this.form.get('village').enable();
        }
      });

    this.form.get('ownership').valueChanges.subscribe(
      ownership => {
        this.ownership_status = (ownership === 'Other') ? true : false
      })
  }

  getRegions() {
    this.sharedService.getRegions().subscribe(res => {
      this.regions = res.results
    })
  }

  getDistricts(id: number) {
    const query = 'region=' + id
    this.sharedService.getDistricts(query).subscribe(res => {
      this.districts = res.results
    })
  }

  getVillages(id: number) {
    const query = 'district=' + id
    this.sharedService.getVillages(query).subscribe(res => {
      this.villages = res.results
    })
  }

  onSubmit() {
    this.loading = true
    if (this.form.value.coordinates) {
      const coordinates = this.form.value.coordinates.toString().split(',')
      this.form.controls['lat'].setValue(coordinates[0])
      this.form.controls['lng'].setValue(coordinates[1])
      delete this.form.value.coordinates;
    }

    if (this.form.value.other_owner) {
      this.form.controls['ownership'].setValue(this.form.value.other_owner)
    }

    this.update ? this.apiUpdateSchool() : this.apiCreateSchool()
  }

  apiCreateSchool() {
    this.schoolService.addSchools(this.form.value).subscribe(
      res => {
        this.school = res
        this.notifyService.notify('School has been successfully created', 'success')
        this.update = true
        this.loading = false
        this.router.navigate(['/schools/view-schools'])

      }, error => {
        this.loading = false
        this.error = error
        this.notifyService.notify('Error occurred on creating school', 'error')
      }
    )
  }

  apiUpdateSchool() {
    this.schoolService.updateSchool(this.form.value, this.school.id).subscribe(
      res => {
        this.loading = false
        this.school = res
        this.notifyService.notify('School has been successfully updated', 'success')
        this.router.navigate(['/schools/view-schools'])
      }, error => {
        this.loading = false
        this.error = error
        this.notifyService.notify('Error occurred on updating school', 'error')
      }
    )
  }

  getSchool(id) {
    this.schoolService.getSingleItem('schools', id).subscribe(res => {
      this.school = res;
      this.updateForm(res);
    });
  }

  villagedClicked() {
    if (this.update && this.hideRegion) {
      console.log('seeen')
      this.hideRegion = false;
      this.form.get('village').setValue('');
      this.form.get('village').disable();
      this.form.get('district').disable();
      this.form.get('region').enable();
    }
  }

  updateForm(data) {
    const coodinates = data.lat && data.lng ? `${data.lat},${data.lng}` : '';
    this.form = this.fb.group({
      emis_code: data.emis_code,
      name: data.name,
      region: data.region,
      district: data.district,
      village: data.village,
      phone: data.phone,
      email: data.email,
      school_ministry: data.school_ministry,
      founder_name: data.founder_name,
      former_school_name: data.former_school_name,
      year_of_foundation: data.year_of_foundation, // todo: custom validation for year
      ownership: data.ownership,
      other_owner: data.other_owner,
      location: data.location,
      lat: data.lat,
      lng: data.lng,
      start_of_calendar: data.start_of_calendar,
      end_of_calendar: data.end_of_calendar,
      lowest_grade: data.lowest_grade,
      highest_grade: data.highest_grade,
      schooling: data.schooling,
    });

    this.formChangeSubscription();

    if (data.village) {
      this.form.get('district').disable();
      if (data.district) {
        this.getVillages(data.district);
        this.form.get('region').disable();
        this.hideRegion = true;
      } else {
        this.form.get('village').disable();
      }
    } else {
      this.form.get('village').disable();
      this.form.get('district').disable();
    }
    this.form.get('village').setValue(data.village)
  }
}

