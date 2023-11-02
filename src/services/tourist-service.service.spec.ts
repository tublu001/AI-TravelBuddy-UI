import { TestBed } from '@angular/core/testing';

import { TouristServiceService } from './tourist-service.service';

describe('TouristServiceService', () => {
  let service: TouristServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TouristServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
