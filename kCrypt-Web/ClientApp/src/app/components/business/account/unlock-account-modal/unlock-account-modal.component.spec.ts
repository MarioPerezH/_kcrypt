import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockAccountModalComponent } from './unlock-account-modal.component';

describe('UnlockAccountModalComponent', () => {
  let component: UnlockAccountModalComponent;
  let fixture: ComponentFixture<UnlockAccountModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnlockAccountModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlockAccountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
