import { TestBed } from '@angular/core/testing';

import { NameServerService } from './name-server.service';

describe('NameServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NameServerService = TestBed.get(NameServerService);
    expect(service).toBeTruthy();
  });
});
