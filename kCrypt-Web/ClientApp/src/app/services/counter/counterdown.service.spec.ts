import { TestBed } from '@angular/core/testing';

import { CounterdownService } from './counterdown.service';

describe('CounterdownService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CounterdownService = TestBed.get(CounterdownService);
    expect(service).toBeTruthy();
  });
});
