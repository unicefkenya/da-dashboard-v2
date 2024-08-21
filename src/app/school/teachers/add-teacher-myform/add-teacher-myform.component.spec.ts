import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddTeacherMyformComponent } from './add-teacher-myform.component';

describe('AddTeacherMyformComponent', () => {
  let component: AddTeacherMyformComponent;
  let fixture: ComponentFixture<AddTeacherMyformComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [AddTeacherMyformComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeacherMyformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
