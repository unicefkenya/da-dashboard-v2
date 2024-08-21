import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PromoteLearnerComponent } from './promote-learner.component';

describe('PromoteLearnerComponent', () => {
  let component: PromoteLearnerComponent;
  let fixture: ComponentFixture<PromoteLearnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [PromoteLearnerComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoteLearnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
