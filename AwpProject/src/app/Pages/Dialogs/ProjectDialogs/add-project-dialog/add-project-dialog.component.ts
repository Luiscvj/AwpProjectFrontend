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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { ProjectDto } from '../../../../Models/ProjectDTOS/ProjectDto';
import { ProjectCategoryDto } from '../../../../Models/ProjectCategoryDTOS/project-category-dto';
import { ProjectCategoryService } from '../../../../Services/ProjectCategory/project-category.service';
@Component({
  selector: 'app-add-project-dialog',
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
  templateUrl: './add-project-dialog.component.html',
  styleUrl: './add-project-dialog.component.css'
})
export class AddProjectDialogComponent implements OnInit {
    public  listProjectCategories : ProjectCategoryDto[] = [];
    constructor(
      public _projectCategoryService: ProjectCategoryService,
      public dialogRef: MatDialogRef<AddProjectDialogComponent>,
             @Inject(MAT_DIALOG_DATA) public projectData: ProjectDto
    ){}

    ngOnInit(): void {
      try
      { console.log(this.projectData);
          this._projectCategoryService.GetListProjectCategory().subscribe(
            {
              next:(data:ProjectCategoryDto[])=>
                {
                  if(data.length> 0 )
                    {
                      this.listProjectCategories = data
                      console.log(data);
                      
                    }else
                    {
                      console.log(`Hubo un error, data:  ${data}`);
                      
                    }
                }
            })
      }catch(error)
      {
        console.error(error)
      }
    }
    onNoClick(){
      this.dialogRef.close();
    }
}
