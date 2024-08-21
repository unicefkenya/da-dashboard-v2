import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WebsiteComponent } from './website.component';

describe('WebsiteComponent', () => {
  let component: WebsiteComponent;
  let fixture: ComponentFixture<WebsiteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [WebsiteComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(WebsiteComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(WebsiteComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
