import { TestBed } from '@angular/core/testing';

import { DomainUserService } from './domain-user.service';

describe('DomainUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DomainUserService = TestBed.get(DomainUserService);
    expect(service).toBeTruthy();
  });
});
