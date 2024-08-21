import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddLearnerComponent } from './add-learner.component';

describe('AddLearnerComponent', () => {
  let component: AddLearnerComponent;
  let fixture: ComponentFixture<AddLearnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [AddLearnerComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLearnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
