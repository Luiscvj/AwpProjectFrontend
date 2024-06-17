import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ProjectService } from '../../../../Services/Project/project.service';
import {MatDialog} from '@angular/material/dialog';
import {
  FormsModule,  
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AddProjectDialogComponent } from '../../../Dialogs/ProjectDialogs/add-project-dialog/add-project-dialog.component';
import { ProjectDto } from '../../../../Models/ProjectDTOS/ProjectDto';
import { AuthService } from '../../../../Services/User/auth.service';
import { UserDto } from '../../../../Models/UserDTOS/UserDto';
import { Router } from '@angular/router';
import { HomeHeaderProjectService } from '../../../../Services/Shared/HomeHeaderProject/home-header-project.service';
import { EditprojectDialogComponent } from '../../../Dialogs/ProjectDialogs/editproject-dialog/editproject-dialog.component';
import {MatMenuModule} from '@angular/material/menu';
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [MatButtonModule,
            MatIconModule,
            MatFormFieldModule,
            FormsModule,
            MatInputModule,
            MatMenuModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit{
  userData: UserDto  = new   UserDto();
  projectList: ProjectDto[] = []
  constructor(private _projectService: ProjectService,
     public dialog:MatDialog,
     public _authService:AuthService,
     private router:Router,
     private _homeHeaderService: HomeHeaderProjectService,
     private cdr: ChangeDetectorRef,
  ){}


 async  ngOnInit(): Promise<void> {
    const userInfo = await this._authService.getUserInfo();
    if(userInfo)
      {
        this.userData = userInfo
      }else
      {
        console.log("No user data avaliable");
      }
    this.uploadProjects(this.userData.Id);
    

  }
  public projectDto: ProjectDto = new ProjectDto();
  
  
   openProjectDialog(): void {
        const dialogRef = this.dialog.open(AddProjectDialogComponent,{
        data: {projectValue: this.projectDto.projectValue, projectCode: this.projectDto.projectCode,userId:this.userData.Id}
    
      });

        dialogRef.afterClosed().subscribe({
          next:(data:ProjectDto)=>{
            
            if(data)
              {
                 
                this._projectService.postProject(data).subscribe(
                  {
                    next:(data)=>
                      {
                        if(data)
                          {
                            this.uploadProjects(this.userData.Id);

                            alert("New project created successfully");
                          }else
                          {
                            alert("We can't create te project, pleas try again :)");
                          }
                          
                      }
                     
                  })
              }
           
          }
        })       
   }



uploadProjects(userId:string)
   {
    this._projectService.GetListProjectsByOwnerUser(this.userData.Id).subscribe(
      {
         next:(data:ProjectDto[])=>
          {
            this.projectList = data;
            this.cdr.detectChanges();
          }
      })

   }

   public goToOverallProject(projectId: number) 
   {

      this._projectService.getProject(projectId).subscribe(
        {
         next:(data)=>
          {

            if(data)
              {
                this._homeHeaderService.updateHeaderInfo(data);
                this.router.navigate(['/home/overall-project'])//If this route is a child, we must to specify the father in the route
              }
          
          }
          
        })
    
    
   }




   openEditProjectDialog( project: ProjectDto)
   {
     const dialogRef = this.dialog.open(EditprojectDialogComponent,
       {
         data:{projectId: project.projectId,projectValue: project.projectValue, projectCode: project.projectCode,userId:this.userData.Id}
       });
 
     dialogRef.afterClosed().subscribe(
       {
         next:(data:ProjectDto)=>
           {
 
             if(data)
               {
                 this._projectService.updateProject(data).subscribe(
                   {
                     next:(result)=>
                       {
                          if(result.statusCode == 200)
                           {
                            this.uploadProjects(this.userData.Id);
                             alert(`${result.message}`);
                             
                             
                           }
                       }
                   })
               }
           }
       })
 
   }


   DeleteProject(projectId: number)
   {
    this._projectService.deleteProject(projectId).subscribe(
      {
        next:(result)=>
          {
            if(result.statusCode === 204)
              {
                this.uploadProjects(this.userData.Id);
                alert(result.message);
              }
          }
          
      })
   }
 

}
