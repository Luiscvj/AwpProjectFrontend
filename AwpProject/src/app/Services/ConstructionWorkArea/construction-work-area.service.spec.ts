import { TestBed } from '@angular/core/testing';

import { ConstructionWorkAreaService } from './construction-work-area.service';

describe('ConstructionWorkAreaService', () => {
  let service: ConstructionWorkAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstructionWorkAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
