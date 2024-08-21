import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TablesComponent } from './tables.component';

describe('TablesComponent', () => {
  let component: TablesComponent;
  let fixture: ComponentFixture<TablesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [TablesComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(TablesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(TablesComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
