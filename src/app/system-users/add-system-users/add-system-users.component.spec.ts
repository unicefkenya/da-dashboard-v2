import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddSystemUsersComponent } from './add-system-users.component';

describe('AddSystemUsersComponent', () => {
  let component: AddSystemUsersComponent;
  let fixture: ComponentFixture<AddSystemUsersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [AddSystemUsersComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSystemUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
