import { Injectable, inject } from '@angular/core';
import { appsettings } from '../../Settings/appsettings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProjectDto } from '../../Models/ProjectDTOS/ProjectDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
   private http = inject(HttpClient)
   private apiUrl:string = appsettings.apiUrl + 'Project'
  constructor() { }

  getListProjects(): Observable<ProjectDto[]>{
    return this.http.get<ProjectDto[]>(`${this.apiUrl}/GetListProjects`);
  }

  getProject(projectId:number): Observable<ProjectDto>{
    const params = new HttpParams().set('projectId',projectId)
    return this.http.get<ProjectDto>(`${this.apiUrl}`,{params});
  }

  postProject(project:ProjectDto): Observable<any>{
     return this.http.post<any>(`${this.apiUrl}`,project);
  }

  deleteProject(projectId:number): Observable<any>{
    const params = new HttpParams().set('projectId',projectId);
    return this.http.delete<any>(`${this.apiUrl}`,{params});
  }

  updateProject(project:ProjectDto): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}`,project);
  }


  GetListProjectsByOwnerUser(userId: string): Observable<ProjectDto[]>
  {
    
    const params = new HttpParams().set("userId",userId);
    return this.http.get<ProjectDto[]>(`${this.apiUrl}/GetListProjectsByOwnerUser`, {params});
  }
  

}
