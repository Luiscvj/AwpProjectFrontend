import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA,
MatDialogRef,
MatDialogTitle,
MatDialogContent,
MatDialogActions,
MatDialogClose,
} from '@angular/material/dialog';
import {
  FormsModule,  
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CreditRuleDto } from '../../../../Models/CreditRuleDTOS/CreditRuleDto';
import { DisciplineDto } from '../../../../Models/DisciplineDTOS/DisciplineDto';
import { DisciplineService } from '../../../../Services/Discipline/discipline.service';
@Component({
  selector: 'app-add-credit-rule',
  standalone: true,
  imports: 
  [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule
  ],
  templateUrl: './add-credit-rule.component.html',
  styleUrl: './add-credit-rule.component.css'
})
export class AddCreditRuleComponent implements OnInit {
  disciplines: DisciplineDto[] = [];
  disciplineData: DisciplineDto = new DisciplineDto();
  constructor
  (
    public dialogRef: MatDialogRef<AddCreditRuleComponent>,
    @Inject(MAT_DIALOG_DATA) public creditRule :CreditRuleDto,
    public  disciplineService: DisciplineService
  )
  {}
  ngOnInit(): void {
    try
    {
      this.disciplineService.GetListDiscipline().subscribe(
        {
          next:(disciplines:DisciplineDto[])=>
            {
              if(disciplines)
                {
                  this.disciplines = disciplines;
                  console.log(disciplines);
                }
            }
        })
    }catch(error)
    {
      console.log(error);
    }
   
  }



  onNoClick()
  {
    this.dialogRef.close();
  }
}
