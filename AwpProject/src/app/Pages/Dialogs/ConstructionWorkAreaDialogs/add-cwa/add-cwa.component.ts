import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  } from '@angular/material/dialog';
  import { CommonModule } from '@angular/common';
  import {MatDatepickerModule} from '@angular/material/datepicker';
  import {provideNativeDateAdapter} from '@angular/material/core';
  import {
    FormsModule,  
    ReactiveFormsModule,
    FormGroup,
    FormBuilder,
    FormControl,
    Validators,} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ConstructionWorkAreaDto } from '../../../../Models/ConstructionWorkAreaDTOS/ConstructionWorkAreaDto';
import { CustomValidators } from '../../../../Helpers/CustomValidators';
import { MyErrorStateMatcher } from '../../../../Helpers/MyErrorStateMatcher';
@Component({
  selector: 'app-add-cwa',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: 
  [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDatepickerModule,
    MatSelectModule,
    CommonModule
   
  ],
  templateUrl: './add-cwa.component.html',
  styleUrl: './add-cwa.component.css'
})
export class AddCwaComponent {
  matcher = new MyErrorStateMatcher();
  unitsOfMeasurement = [
    {unitOfMeasurementBySystemOfUnitId: 2, Abbreviation :'ft'},
    {unitOfMeasurementBySystemOfUnitId: 21, Abbreviation :'m'}
  ]
  public addCwaForm: FormGroup = this.formBuild.group(
    {
       cwaPlannedValue: new FormControl('',
        {
          validators: [Validators.required,CustomValidators.maxDigit(15)],
          updateOn: 'change'
        }),
      cwaPlannedHours: new FormControl('',
          {
             validators: [Validators.required,CustomValidators.maxDigit(10)],
             updateOn: 'change'
          }),
       cwaSequenceNumber: new FormControl('',
          {
            validators: [Validators.required,CustomValidators.maxDigit(3),Validators.pattern('^[1-9][0-9]*')],
            updateOn: 'change'
           
          }),
       area: new FormControl('',
        {
          validators:[Validators.required, CustomValidators.maxDigit(12)],
          updateOn: 'change'
  
        }),
       workerArea: new FormControl('',
        {
          validators: [CustomValidators.maxDigit(5)],
          updateOn: 'change'
        }),
        cwaStartDate: new FormControl('',
          {
            validators: [Validators.required],
            updateOn: 'blur'
          }),
        cwaFinishDate: new FormControl('',
          {
            validators: [Validators.required],
            updateOn: 'blur'
          }),
        unitOfMeasurementBySystemOfUnitId: new FormControl('',
          {
            validators: [Validators.required],
            updateOn: 'blur'
          }),
        
    }) 
  constructor
  (
    public dialogRef: MatDialogRef<AddCwaComponent>,
    @Inject(MAT_DIALOG_DATA) public cwaData: ConstructionWorkAreaDto,
    public formBuild: FormBuilder
  ){}

   
  onNoClick():void
  {
    this.dialogRef.close();
  }
}
