import { TestBed } from '@angular/core/testing';

import { DefinedcontributionService } from './definedcontribution.service';

describe('DefinedcontributionService', () => {
  let service: DefinedcontributionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefinedcontributionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
