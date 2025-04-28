import { TestBed } from '@angular/core/testing';

import { BlankServiceService } from './blank-service.service';

describe('BlankServiceService', () => {
  let service: BlankServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlankServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
