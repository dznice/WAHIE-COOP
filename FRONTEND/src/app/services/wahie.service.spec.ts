import { TestBed } from '@angular/core/testing';

import { WahieService } from './wahie.service';

describe('WahieService', () => {
  let service: WahieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WahieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
