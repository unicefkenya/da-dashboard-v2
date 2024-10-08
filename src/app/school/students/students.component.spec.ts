import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StudentsComponent } from './students.component';

describe('StudentsComponent', () => {
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [StudentsComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(StudentsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(StudentsComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
