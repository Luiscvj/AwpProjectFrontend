import { Injectable } from '@angular/core';
import { appsettings } from '../../Settings/appsettings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConstructionWorkAreaDto } from '../../Models/ConstructionWorkAreaDTOS/ConstructionWorkAreaDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConstructionWorkAreaService {
   apiUrl:string =  appsettings.apiUrl + 'ConstructionWorkArea';

  constructor(public http: HttpClient) { }

  GetCwaByProject(projectId: number): Observable<ConstructionWorkAreaDto[]|any>
  {
     const params = new HttpParams().set('projectId',projectId);
     return this.http.get<ConstructionWorkAreaDto[]|any>(`${this.apiUrl}/GetCwaByProject`,{params:params, observe:'response'});
  }
  PostConstructionWorkArea(model: ConstructionWorkAreaDto): Observable<any>
  { 
    model.unitOfMeasurementBySystemOfUnitId = Number(model.unitOfMeasurementBySystemOfUnitId);
    model.cwaCode = '00'+ model.cwaSequenceNumber;
    return  this.http.post<any>(`${this.apiUrl}`,model,{ observe: 'response'});
  }

  DeleteConstructionWorkArea(constructionWorkAreaId: number): Observable<any>
  {
    const params = new HttpParams().set('constructionWorkAreaId',constructionWorkAreaId);
    return this.http.delete<any>(this.apiUrl,{params: params, observe:'response'})
  }

  UpdateConstructionWorkArea(constructionWorkAreaToEdit: ConstructionWorkAreaDto): Observable<any>
  {
    constructionWorkAreaToEdit.unitOfMeasurementBySystemOfUnitId = Number(constructionWorkAreaToEdit.unitOfMeasurementBySystemOfUnitId);
    constructionWorkAreaToEdit.cwaCode = '00'+ constructionWorkAreaToEdit.cwaSequenceNumber;
    return this.http.put<any>(this.apiUrl,constructionWorkAreaToEdit,{observe: 'response'});
  }
}
