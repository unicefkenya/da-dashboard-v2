import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SystemUsersComponent } from './system-users.component';

describe('SystemUsersComponent', () => {
  let component: SystemUsersComponent;
  let fixture: ComponentFixture<SystemUsersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [SystemUsersComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
