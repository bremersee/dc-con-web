import { TestBed } from '@angular/core/testing';

import { AuthStorageService } from './auth-storage.service';

describe('AuthStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthStorageService = TestBed.get(AuthStorageService);
    expect(service).toBeTruthy();
  });
});
