import { Injectable } from '@angular/core';
import { appsettings } from '../../Settings/appsettings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProjectAnalysisEarnedActualHoursDto } from '../../Models/ProjectAnalysesDTOS/project-analysis-earned-actual-hours-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectAnalysesService {
  public apiUrl:string  = appsettings.apiUrl + 'ProjectAnalysis/';
  constructor(private http : HttpClient) { }

  GetGeneralProjectAnalysis(projectId:number): Observable<ProjectAnalysisEarnedActualHoursDto[]>
  {
     const params = new HttpParams().set('projectToAnalyzeId',projectId);
     return this.http.get<ProjectAnalysisEarnedActualHoursDto[]>(`${this.apiUrl}GetGeneralProjectAnalysis`,{params});
  }
}
