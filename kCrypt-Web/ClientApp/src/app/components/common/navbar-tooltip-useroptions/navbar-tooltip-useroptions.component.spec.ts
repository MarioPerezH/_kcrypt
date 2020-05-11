import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarTooltipUseroptionsComponent } from './navbar-tooltip-useroptions.component';

describe('NavbarTooltipUseroptionsComponent', () => {
  let component: NavbarTooltipUseroptionsComponent;
  let fixture: ComponentFixture<NavbarTooltipUseroptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarTooltipUseroptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarTooltipUseroptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
