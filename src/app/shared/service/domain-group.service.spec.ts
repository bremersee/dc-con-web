import { TestBed } from '@angular/core/testing';

import { DomainGroupService } from './domain-group.service';

describe('DomainGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DomainGroupService = TestBed.get(DomainGroupService);
    expect(service).toBeTruthy();
  });
});
