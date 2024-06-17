import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditRulesComponent } from './credit-rules.component';

describe('CreditRulesComponent', () => {
  let component: CreditRulesComponent;
  let fixture: ComponentFixture<CreditRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditRulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
