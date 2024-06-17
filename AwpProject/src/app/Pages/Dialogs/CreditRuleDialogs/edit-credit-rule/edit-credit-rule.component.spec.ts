import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCreditRuleComponent } from './edit-credit-rule.component';

describe('EditCreditRuleComponent', () => {
  let component: EditCreditRuleComponent;
  let fixture: ComponentFixture<EditCreditRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCreditRuleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCreditRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
