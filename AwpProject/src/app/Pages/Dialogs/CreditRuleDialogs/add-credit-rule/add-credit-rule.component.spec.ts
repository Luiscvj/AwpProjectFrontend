import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCreditRuleComponent } from './add-credit-rule.component';

describe('AddCreditRuleComponent', () => {
  let component: AddCreditRuleComponent;
  let fixture: ComponentFixture<AddCreditRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCreditRuleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCreditRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
