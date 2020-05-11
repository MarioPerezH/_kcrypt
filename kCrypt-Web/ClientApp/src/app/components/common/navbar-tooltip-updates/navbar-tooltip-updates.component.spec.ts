import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarTooltipUpdatesComponent } from './navbar-tooltip-updates.component';

describe('NavbarTooltipUpdatesComponent', () => {
  let component: NavbarTooltipUpdatesComponent;
  let fixture: ComponentFixture<NavbarTooltipUpdatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarTooltipUpdatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarTooltipUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
