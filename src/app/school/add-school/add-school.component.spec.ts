import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { AddSchoolComponent } from './add-school.component'
import { FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';


describe('AddSchoolComponent', () => {
  let component: AddSchoolComponent
  let fixture: ComponentFixture<AddSchoolComponent>
  const fb: FormBuilder = new FormBuilder()

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatCheckboxModule,
        MatButtonModule,
        MatToolbarModule,
        MatTabsModule,
        MatRadioModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [AddSchoolComponent],
      providers: [{ provide: FormBuilder, useValue: fb }],
      teardown: { destroyAfterEach: false }
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AddSchoolComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(AddSchoolComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
