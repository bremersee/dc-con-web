import { TestBed } from '@angular/core/testing';

import { AdminUserGuardService } from './admin-user-guard.service';

describe('AdminUserGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminUserGuardService = TestBed.get(AdminUserGuardService);
    expect(service).toBeTruthy();
  });
});
