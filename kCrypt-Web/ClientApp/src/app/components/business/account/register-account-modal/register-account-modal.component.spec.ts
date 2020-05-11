import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAccountModalComponent } from './register-account-modal.component';

describe('RegisterAccountModalComponent', () => {
  let component: RegisterAccountModalComponent;
  let fixture: ComponentFixture<RegisterAccountModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAccountModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAccountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
