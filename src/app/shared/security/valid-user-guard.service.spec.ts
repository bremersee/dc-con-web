import { TestBed } from '@angular/core/testing';

import { ValidUserGuardService } from './valid-user-guard.service';

describe('ValidUserGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidUserGuardService = TestBed.get(ValidUserGuardService);
    expect(service).toBeTruthy();
  });
});
