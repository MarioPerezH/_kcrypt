import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubgroupformatsComponent } from './subgroupformats.component';

describe('SubgroupformatsComponent', () => {
  let component: SubgroupformatsComponent;
  let fixture: ComponentFixture<SubgroupformatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubgroupformatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubgroupformatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
