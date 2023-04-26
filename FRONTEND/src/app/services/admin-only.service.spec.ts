import { TestBed } from '@angular/core/testing';

import { AdminOnlyService } from './admin-only.service';

describe('AdminOnlyService', () => {
  let service: AdminOnlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminOnlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
