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
import { DisciplineService } from '../../../../Services/Discipline/discipline.service';
import { DisciplineDto } from '../../../../Models/DisciplineDTOS/DisciplineDto';

@Component({
  selector: 'app-edit-credit-rule',
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
  templateUrl: './edit-credit-rule.component.html',
  styleUrl: './edit-credit-rule.component.css'
})
export class EditCreditRuleComponent implements OnInit{
  disciplines: DisciplineDto[] = [];

  constructor
  (
    public dialogRef: MatDialogRef<EditCreditRuleComponent>,
    @Inject(MAT_DIALOG_DATA) public creditRule: CreditRuleDto,
    public _disciplineService: DisciplineService
  ){}

  ngOnInit(): void {
    try
    {
      this._disciplineService.GetListDiscipline().subscribe(
        {
          next:(_disciplines:DisciplineDto[])=>
            {
              if(_disciplines.length > 0)
                {
                  this.disciplines = _disciplines;
                }
            }
        })
    }catch(error)
    {
      console.log(error);
    }
  }

  onNoClick():void
  {
    this.dialogRef.close();
  }
}


