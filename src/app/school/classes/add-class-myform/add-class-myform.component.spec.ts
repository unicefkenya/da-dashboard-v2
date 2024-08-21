import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddClassMyformComponent } from './add-class-myform.component';

describe('AddClassMyformComponent', () => {
  let component: AddClassMyformComponent;
  let fixture: ComponentFixture<AddClassMyformComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [AddClassMyformComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClassMyformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
