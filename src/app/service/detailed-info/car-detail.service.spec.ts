import { TestBed } from '@angular/core/testing';

import { CarDetailService } from './car-detail.service';

describe('CarDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarDetailService = TestBed.get(CarDetailService);
    expect(service).toBeTruthy();
  });
});
