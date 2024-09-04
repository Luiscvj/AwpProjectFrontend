import { TestBed } from '@angular/core/testing';

import { ProjectAnalysesService } from './project-analyses.service';

describe('ProjectAnalysesService', () => {
  let service: ProjectAnalysesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectAnalysesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
