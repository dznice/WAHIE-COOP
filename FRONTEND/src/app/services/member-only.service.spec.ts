import { TestBed } from '@angular/core/testing';

import { MemberOnlyService } from './member-only.service';

describe('MemberOnlyService', () => {
  let service: MemberOnlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberOnlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
