import { TestBed } from '@angular/core/testing';

import { TestErrorService } from './test-error.service';

describe('TestErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestErrorService = TestBed.get(TestErrorService);
    expect(service).toBeTruthy();
  });
});
