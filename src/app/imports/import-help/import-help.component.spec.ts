import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ImportHelpComponent } from './import-help.component';

describe('ImportHelpComponent', () => {
  let component: ImportHelpComponent;
  let fixture: ComponentFixture<ImportHelpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [ImportHelpComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
