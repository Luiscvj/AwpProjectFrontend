import { TestBed } from '@angular/core/testing';

import { CreditRuleService } from './credit-rule.service';

describe('CreditRuleService', () => {
  let service: CreditRuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditRuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
