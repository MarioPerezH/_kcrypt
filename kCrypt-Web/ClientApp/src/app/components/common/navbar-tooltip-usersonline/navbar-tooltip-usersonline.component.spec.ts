import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarTooltipUsersonlineComponent } from './navbar-tooltip-usersonline.component';

describe('NavbarTooltipUsersonlineComponent', () => {
  let component: NavbarTooltipUsersonlineComponent;
  let fixture: ComponentFixture<NavbarTooltipUsersonlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarTooltipUsersonlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarTooltipUsersonlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
