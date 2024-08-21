import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DropoutsComponent } from './dropouts.component';

describe('DropoutsComponent', () => {
  let component: DropoutsComponent;
  let fixture: ComponentFixture<DropoutsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [DropoutsComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
