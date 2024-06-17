import { Component, Inject } from '@angular/core';
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
import { ProjectDto } from '../../../../Models/ProjectDTOS/ProjectDto';
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
  ],
  templateUrl: './add-project-dialog.component.html',
  styleUrl: './add-project-dialog.component.css'
})
export class AddProjectDialogComponent {
    
    constructor(
      public dialogRef: MatDialogRef<AddProjectDialogComponent>,
             @Inject(MAT_DIALOG_DATA) public projectData: ProjectDto
    ){}


    onNoClick(){
      this.dialogRef.close();
    }
}
