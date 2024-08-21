import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MoveStudentsComponent } from './move-students.component';

describe('MoveStudentsComponent', () => {
  let component: MoveStudentsComponent;
  let fixture: ComponentFixture<MoveStudentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [MoveStudentsComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
