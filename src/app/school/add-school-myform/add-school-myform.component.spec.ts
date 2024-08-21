import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddSchoolMyformComponent } from './add-school-myform.component';

describe('AddSchoolMyformComponent', () => {
  let component: AddSchoolMyformComponent;
  let fixture: ComponentFixture<AddSchoolMyformComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [AddSchoolMyformComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSchoolMyformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
