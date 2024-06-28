import { TestBed } from '@angular/core/testing';

import { DefinedbenifitService } from './definedbenifit.service';

describe('DefinedbenifitService', () => {
  let service: DefinedbenifitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefinedbenifitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
