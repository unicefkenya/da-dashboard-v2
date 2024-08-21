import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddImportComponent } from './add-import.component';

describe('AddImportComponent', () => {
  let component: AddImportComponent;
  let fixture: ComponentFixture<AddImportComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [AddImportComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
