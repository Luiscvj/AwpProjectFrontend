import { Injectable } from '@angular/core';
import { appsettings } from '../../Settings/appsettings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProjectCategoryDto } from '../../Models/ProjectCategoryDTOS/project-category-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectCategoryService {
  private apiUrl:string = appsettings.apiUrl + 'ProjectCategory/';
  
  constructor(private http: HttpClient) { }
  PostProjectCategory(model: ProjectCategoryDto):Observable<any>
  {
    return this.http.post<any>(this.apiUrl,model)
  } 
   GetListProjectCategory(): Observable<ProjectCategoryDto[]>
   {
      return this.http.get<ProjectCategoryDto[]>(`${this.apiUrl}GetListProjectCategory`);
   }
   GetProjectCategory(projectCategoryId: number): Observable<ProjectCategoryDto>
   {
      const params =  new HttpParams().set('projectCategoryId',projectCategoryId);
      return this.http.get<ProjectCategoryDto>(this.apiUrl,{params});
   }


}
