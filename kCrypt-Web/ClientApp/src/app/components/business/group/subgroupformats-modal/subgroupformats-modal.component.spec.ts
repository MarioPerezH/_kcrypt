import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubgroupformatsModalComponent } from './subgroupformats-modal.component';

describe('SubgroupformatsModalComponent', () => {
  let component: SubgroupformatsModalComponent;
  let fixture: ComponentFixture<SubgroupformatsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubgroupformatsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubgroupformatsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
