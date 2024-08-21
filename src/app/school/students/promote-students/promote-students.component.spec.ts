import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PromoteStudentsComponent } from './promote-students.component';

describe('PromoteStudentsComponent', () => {
  let component: PromoteStudentsComponent;
  let fixture: ComponentFixture<PromoteStudentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [PromoteStudentsComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoteStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
