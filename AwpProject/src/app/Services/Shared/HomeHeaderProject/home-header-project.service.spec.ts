import { TestBed } from '@angular/core/testing';

import { HomeHeaderProjectService } from './home-header-project.service';

describe('HeaderProjectService', () => {
  let service: HomeHeaderProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeHeaderProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
