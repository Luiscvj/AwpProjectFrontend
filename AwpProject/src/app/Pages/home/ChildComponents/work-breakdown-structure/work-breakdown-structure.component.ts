import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { ConstructionWorkAreaService } from '../../../../Services/ConstructionWorkArea/construction-work-area.service';
import { ConstructionWorkAreaDto } from '../../../../Models/ConstructionWorkAreaDTOS/ConstructionWorkAreaDto';
import { MatDialog } from '@angular/material/dialog';
import { AddCwaComponent } from '../../../Dialogs/ConstructionWorkAreaDialogs/add-cwa/add-cwa.component';
import { EditCwaComponent } from '../../../Dialogs/ConstructionWorkAreaDialogs/edit-cwa/edit-cwa.component';

@Component({
  selector: 'app-work-breakdown-structure',
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
  templateUrl: './work-breakdown-structure.component.html',
  styleUrl: './work-breakdown-structure.component.css'
})
export class WorkBreakdownStructureComponent implements OnInit {
  projectId: number| null = null;
  constructionWorkAreas: ConstructionWorkAreaDto[] = [];
  constructionWorkArea = new ConstructionWorkAreaDto();
  constructor(private activateRoute: ActivatedRoute, public _cwaService: ConstructionWorkAreaService, private  cdr: ChangeDetectorRef, public dialog: MatDialog){}
  ngOnInit(): void {
   this.activateRoute.paramMap.subscribe(params=>
      {
        const id = params.get('projectId');
        this.projectId = Number(id);
        this.getCwaByProject();
      
      })
     


  }

 private  getCwaByProject():void
  {
    if(this.projectId)
      {
        this._cwaService.GetCwaByProject(this.projectId).subscribe(
          {
            next:(data:ConstructionWorkAreaDto[]|any)=>
              {
                
                if(data.status === 200)
                  {
                    this.constructionWorkAreas = data.body;
                  }else if(data.status === 204)
                    {
                      this.constructionWorkAreas = []; 
                    }
                    this.cdr.detectChanges();
              },
              error:(error)=>
                {
                  console.log("Error: ",error.status);
                }
          })
      }
  }
  addConstructionWorkArea(): void
  {
    const dialogRef = this.dialog.open(AddCwaComponent,
      {
       
       minWidth:'650px',
       height:'400px',
       data:{cwaStartDate: this.constructionWorkArea.cwaStartDate,
             cwaFinishDate: this.constructionWorkArea.cwaFinishDate,
             cwaSequenceNumber: this.constructionWorkArea.cwaSequenceNumber,
             area: this.constructionWorkArea.area,
             workerArea: this.constructionWorkArea.workerArea,
             cwaPlannedHours: this.constructionWorkArea.cwaPlannedHours,
             cwaPlannedValue: this.constructionWorkArea.cwaPlannedValue,
             unitOfMeasurementBySystemOfUnitId: this.constructionWorkArea.unitOfMeasurementBySystemOfUnitId,
             projectId: this.constructionWorkArea.projectId
             }

      });

      dialogRef.afterClosed().subscribe(
        {
          next:(data:ConstructionWorkAreaDto|null)=>      
            { 
              if(data)
                {
                  if(this.projectId)
                    {
                      data.projectId = this.projectId
                    }
                     this._cwaService.PostConstructionWorkArea(data).subscribe(
                      {
                        next:response=>
                          {
                            if(!(response.status === 201))
                              {
                                alert("Can't create the  cwa");
                              }
                              alert('Cwa created successfully');
                              this.getCwaByProject();
      
                            
                          },
                          error: error=>
                            {
                              console.error('Error status', error.status)
                            }
                      })
                }               
            
            }
        })
  }


  deleteConstructionWorkArea(constructionWorkAreaId: number)
  {
    this._cwaService.DeleteConstructionWorkArea(constructionWorkAreaId).subscribe(
      {
        next:response=>
          {
            if(!(response.status === 204))
              {
                alert("Can't  delete the record")
              }
              alert('CWA deleted successfully');
              this.getCwaByProject()
          }
      })
  }

  editConstructionWorkArea(cwaToEdit:ConstructionWorkAreaDto):void
  {
    const dialogRef = this.dialog.open(EditCwaComponent,
      {
        minWidth:'650px',
        height:'400px',
        data:{
              constructionWorkAreaId: cwaToEdit.constructionWorkAreaId,
              cwaPlannedValue: cwaToEdit.cwaPlannedValue,
              cwaPlannedHours:cwaToEdit.cwaPlannedHours,
              cwaSequenceNumber:cwaToEdit.cwaSequenceNumber,
              area:cwaToEdit.area,
              workerArea:cwaToEdit.workerArea,
              cwaStartDate:cwaToEdit.cwaStartDate,
              cwaFinishDate:cwaToEdit.cwaFinishDate,
              unitOfMeasurementBySystemOfUnitId:cwaToEdit.unitOfMeasurementBySystemOfUnitId,
              projectId:cwaToEdit.projectId
            
            }
      });


      dialogRef.afterClosed().subscribe(
        {
          next:(data:ConstructionWorkAreaDto)=>
            {
              if(data)
                {
                  this._cwaService.UpdateConstructionWorkArea(data).subscribe(
                    {
                      next:result=>
                        {
                          if(result.status === 204)
                            {
                              alert("Record updated successfully");
                              this.getCwaByProject();
                            }
                        },
                        error: error=>
                          {
                            console.log(error);
                          }
                    })
                }
                }       
        })
  }
}
