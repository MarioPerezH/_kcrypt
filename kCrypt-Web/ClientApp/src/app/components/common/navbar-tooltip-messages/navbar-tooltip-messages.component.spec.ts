import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarTooltipMessagesComponent } from './navbar-tooltip-messages.component';

describe('NavbarTooltipMessagesComponent', () => {
  let component: NavbarTooltipMessagesComponent;
  let fixture: ComponentFixture<NavbarTooltipMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarTooltipMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarTooltipMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
