import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewLearnerComponent } from './view-learner.component';

describe('ViewLearnerComponent', () => {
  let component: ViewLearnerComponent;
  let fixture: ComponentFixture<ViewLearnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [ViewLearnerComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLearnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
