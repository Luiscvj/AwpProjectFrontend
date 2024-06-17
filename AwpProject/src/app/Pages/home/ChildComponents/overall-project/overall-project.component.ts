import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OffcanvasProjectService } from '../../../../Services/Shared/OffcanvasProject/offcanvas-project.service';
import { ButtonOffCanvas } from '../../../../Models/Shared/Buttons/ButtonOffCanvas';
import { ProjectDto } from '../../../../Models/ProjectDTOS/ProjectDto';
import { ProjectService } from '../../../../Services/Project/project.service';
import { HomeHeaderProjectService } from '../../../../Services/Shared/HomeHeaderProject/home-header-project.service';


@Component({
  selector: 'app-overall-project',
  standalone: true,
  imports: [],
  templateUrl: './overall-project.component.html',
  styleUrl: './overall-project.component.css'
})
export class OverallProjectComponent implements OnInit, OnDestroy {
  project:ProjectDto = new ProjectDto();
  public  buttonToActivate:ButtonOffCanvas[] = [];
  constructor(private route: ActivatedRoute,private  _offcanvasProjectService:OffcanvasProjectService, private _projectService:ProjectService, public _router:Router, private _homeHeaderProjectService: HomeHeaderProjectService)
  {}


  ngOnInit(): void {
    
    
      this._homeHeaderProjectService.currentProjectState.subscribe(
        {
          next:(data)=>
            {
              if(data)
                {
                  this.project = data            
                }
            }
        })
      this.buttonToActivate =
      [
        {name:'Work Breakdown Structure',link:`./home/work-breakdown-structure/${this.project.projectId}`},
        {name:'Credit Rules', link:`./home/credit-rules/${this.project.projectId}`}
      ]
    
    this._offcanvasProjectService.updateButtons(this.buttonToActivate);
  }

  ngOnDestroy(): void 
  {
  
    this._homeHeaderProjectService.removeHeaderInfo();
   
  
  }

}
