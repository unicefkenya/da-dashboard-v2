import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SchoolAttendanceComponent } from './school-attendance.component';

describe('SchoolAttendanceComponent', () => {
  let component: SchoolAttendanceComponent;
  let fixture: ComponentFixture<SchoolAttendanceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [SchoolAttendanceComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
