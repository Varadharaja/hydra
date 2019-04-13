import { TestBed } from '@angular/core/testing';

import { HydraApiService } from './hydra-api.service';

describe('HydraApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HydraApiService = TestBed.get(HydraApiService);
    expect(service).toBeTruthy();
  });
});
