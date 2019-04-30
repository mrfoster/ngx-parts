import { TestBed } from '@angular/core/testing';

import { TestPartsService } from './test-parts.service';

describe('TestPartsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestPartsService = TestBed.get(TestPartsService);
    expect(service).toBeTruthy();
  });
});
