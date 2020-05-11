import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarTooltipCountdowntimerComponent } from './navbar-tooltip-countdowntimer.component';

describe('NavbarTooltipCountdowntimerComponent', () => {
  let component: NavbarTooltipCountdowntimerComponent;
  let fixture: ComponentFixture<NavbarTooltipCountdowntimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarTooltipCountdowntimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarTooltipCountdowntimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
