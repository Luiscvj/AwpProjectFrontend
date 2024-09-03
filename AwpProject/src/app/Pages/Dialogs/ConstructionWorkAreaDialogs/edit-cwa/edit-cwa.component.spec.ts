import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCwaComponent } from './edit-cwa.component';

describe('EditCwaComponent', () => {
  let component: EditCwaComponent;
  let fixture: ComponentFixture<EditCwaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCwaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCwaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
