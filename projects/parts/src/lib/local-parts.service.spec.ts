import { TestBed } from '@angular/core/testing';

import { LocalPartsService } from './local-parts.service';

describe('LocalPartsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalPartsService = TestBed.get(LocalPartsService);
    expect(service).toBeTruthy();
  });
});
