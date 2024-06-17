import { Injectable } from '@angular/core';
import { ProjectDto } from '../../../Models/ProjectDTOS/ProjectDto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeHeaderProjectService {
private projectSource = new BehaviorSubject<ProjectDto>(new ProjectDto());

currentProjectState = this.projectSource.asObservable();
  constructor() { }


  updateHeaderInfo(project: ProjectDto)
  {
    this.projectSource.next(project); 
  }


  removeHeaderInfo()
  {
    const  projectToUpdate =  new ProjectDto();
    this.projectSource.next(projectToUpdate);
  
  }
 



}
