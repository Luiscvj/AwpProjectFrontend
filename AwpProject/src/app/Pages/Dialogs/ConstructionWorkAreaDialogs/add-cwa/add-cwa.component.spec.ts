import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCwaComponent } from './add-cwa.component';

describe('AddCwaComponent', () => {
  let component: AddCwaComponent;
  let fixture: ComponentFixture<AddCwaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCwaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddCwaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
