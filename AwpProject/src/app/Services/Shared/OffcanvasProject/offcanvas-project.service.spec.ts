import { TestBed } from '@angular/core/testing';

import { OffcanvasProjectService } from './offcanvas-project.service';

describe('OffcanvasProjectService', () => {
  let service: OffcanvasProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffcanvasProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
