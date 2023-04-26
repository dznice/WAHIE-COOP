import { TestBed } from '@angular/core/testing';

import { SuperadminOnlyService } from './superadmin-only.service';

describe('SuperadminOnlyService', () => {
  let service: SuperadminOnlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperadminOnlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
