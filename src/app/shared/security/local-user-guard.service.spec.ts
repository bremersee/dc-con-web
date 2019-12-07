import { TestBed } from '@angular/core/testing';

import { LocalUserGuardService } from './local-user-guard.service';

describe('LocalUserGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalUserGuardService = TestBed.get(LocalUserGuardService);
    expect(service).toBeTruthy();
  });
});
