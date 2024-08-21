import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MoveLearnerComponent } from './move-learner.component';

describe('MoveLearnerComponent', () => {
  let component: MoveLearnerComponent;
  let fixture: ComponentFixture<MoveLearnerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [MoveLearnerComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveLearnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
