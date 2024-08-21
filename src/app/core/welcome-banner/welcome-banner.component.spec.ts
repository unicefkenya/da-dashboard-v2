import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WelcomeBannerComponent } from './welcome-banner.component';

describe('WelcomeBannerComponent', () => {
  let component: WelcomeBannerComponent;
  let fixture: ComponentFixture<WelcomeBannerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [WelcomeBannerComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
