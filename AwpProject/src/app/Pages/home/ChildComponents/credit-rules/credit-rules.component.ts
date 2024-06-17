
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import {MatDialog} from '@angular/material/dialog';
import {
  FormsModule,  
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import { UserDto } from '../../../../Models/UserDTOS/UserDto';
import { AuthService } from '../../../../Services/User/auth.service';
import { AddProjectDialogComponent } from '../../../Dialogs/ProjectDialogs/add-project-dialog/add-project-dialog.component';
import { AddCreditRuleComponent } from '../../../Dialogs/CreditRuleDialogs/add-credit-rule/add-credit-rule.component';
import { CreditRuleDto } from '../../../../Models/CreditRuleDTOS/CreditRuleDto';
import { DisciplineDto } from '../../../../Models/DisciplineDTOS/DisciplineDto';
import { CreditRuleService } from '../../../../Services/CreditRule/credit-rule.service';
import { DisciplineService } from '../../../../Services/Discipline/discipline.service';
import { Observable, map, switchMap } from 'rxjs';
import { EditCreditRuleComponent } from '../../../Dialogs/CreditRuleDialogs/edit-credit-rule/edit-credit-rule.component';
@Component({
  selector: 'app-credit-rules',
  standalone: true,
  imports: 
  [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatMenuModule
  ],
  templateUrl: './credit-rules.component.html',
  styleUrl: './credit-rules.component.css'
})
export class CreditRulesComponent implements OnInit {
   userData: UserDto|null = null;
   creditRule: CreditRuleDto = new CreditRuleDto();
   projectId: number = 0 
   groupCreditRuleByDiscipline: { [key: string]: CreditRuleDto[] } = {};
 
  constructor(
     private _authService: AuthService,
     private dialog: MatDialog,
     private _creditRuleService: CreditRuleService,
     private activateRoute: ActivatedRoute,
     private _disciplineService: DisciplineService,
     private cdr: ChangeDetectorRef
      ){}
   
  
  async  ngOnInit(): Promise<void> {
    this.userData =  await  this._authService.getUserInfo();
    this.activateRoute.paramMap.subscribe(params=>
      {
        const id = params.get('projectId');
        this.projectId = Number(id);
        console.log(this.projectId);
      })
      this.getCreditRuleByDiscipline().subscribe(
        {
          next:(data)=>
            {
              this.groupCreditRuleByDiscipline = data;
              this.cdr.detectChanges();
              
            }
        })
      

  }


  openAddCreditRuleDialog() 
  {
    const dialogRef = this.dialog.open(AddCreditRuleComponent,
      {
        data:{creditRuleId:this.creditRule.creditRuleId, disciplineId: this.creditRule.disciplineId, ruleName: this.creditRule.ruleName,projectId: this.projectId}
      })

      dialogRef.afterClosed().subscribe(
        {
          next:(data:CreditRuleDto)=>
            {
             
               this._creditRuleService.PostCreditRule(data).subscribe(
                {
                  next:(result)=>
                    {
                      if(result.statusCode === 201)
                        {
                          alert(result.message);
                          this.getCreditRuleByDiscipline().subscribe(
                            {
                              next:(data)=>
                                {
                                  if(data)
                                    {
                                      this.groupCreditRuleByDiscipline = data;
                                      this.cdr.detectChanges();
                                    }
                                }
                            })
                        }
                    }
                })
            }
        })
  }


  getCreditRuleByDiscipline(): Observable<{[key:string]:CreditRuleDto[]}>
  {
    return this._disciplineService.GetListDiscipline().pipe
    (
      switchMap(disciplines => 
        {
          return this._creditRuleService.GetListCreditRulesByProject(this.projectId).pipe
          (
            map(rules=>
              {
                const grouped : {[key:string]: CreditRuleDto[]} = {};
                disciplines.forEach(discipline =>
                  {
                  
                     let creditRuleByDiscipline = rules.filter( rule => rule.disciplineId === discipline.disciplineId);
                     if(creditRuleByDiscipline.length > 0)
                      {
                        grouped[discipline.disciplineName] = creditRuleByDiscipline;
                      }
                  })

                  return grouped;
              })
              
          )
        })
    )
  }


  getDisciplinesKeys()
  {
    return Object.keys(this.groupCreditRuleByDiscipline);
  }


  deleteCreditRule(creditRuleId: number)
  {
    this._creditRuleService.DeleteCreditRule(creditRuleId).subscribe(
      {
        next:(result)=>
          {
            if(result.statusCode === 204)
              {
                alert(`${result.message}`);
                this.getCreditRuleByDiscipline().subscribe(
                  {
                    next:(data)=>
                      {
                        if(data)
                          {
                            this.groupCreditRuleByDiscipline = data;
                            this.cdr.detectChanges();
                          }
                      }
                  })
              }else
              {
                alert(`${result.message}`);
              }


          }
      })
  }

  editCreditRuleDialog(creditRuleToEdit: CreditRuleDto): void
  {
    const dialogRef = this.dialog.open(EditCreditRuleComponent,
      {
        data:{creditRuleId:creditRuleToEdit.creditRuleId, disciplineId: creditRuleToEdit.disciplineId, ruleName: creditRuleToEdit.ruleName,projectId: this.projectId}
      });
      dialogRef.afterClosed().subscribe(
        {
          next:(data:CreditRuleDto)=>
            {
              if(data)
                {
                  this._creditRuleService.UpdateCreditRule(data).subscribe(
                    {
                      next:(data)=>
                        {
                          if(data.statusCode === 204)
                            {

                              alert(`${data.message}`);
                              this.getCreditRuleByDiscipline().subscribe(
                                {
                                  next:(data)=>
                                    {
                                      if(data)
                                        {
                                          this.groupCreditRuleByDiscipline = data;
                                          this.cdr.detectChanges();
                                        }
                                    }
                                })
                            }else
                            {
                              alert(`${data.message}`);
                            }

                        }
                    })
                }
            }
        })


  }

}
