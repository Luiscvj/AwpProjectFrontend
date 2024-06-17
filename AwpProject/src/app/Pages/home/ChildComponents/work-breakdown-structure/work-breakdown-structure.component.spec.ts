import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkBreakdownStructureComponent } from './work-breakdown-structure.component';

describe('WorkBreakdownStructureComponent', () => {
  let component: WorkBreakdownStructureComponent;
  let fixture: ComponentFixture<WorkBreakdownStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkBreakdownStructureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkBreakdownStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
