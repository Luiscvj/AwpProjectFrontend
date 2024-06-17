import { Injectable } from '@angular/core';
import { appsettings } from '../../Settings/appsettings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DisciplineDto } from '../../Models/DisciplineDTOS/DisciplineDto';

@Injectable({
  providedIn: 'root'
})
export class DisciplineService {
  private apiUrl:string =  appsettings.apiUrl + 'Discipline/'
  
  constructor(private http: HttpClient) 
  { }

  GetListDiscipline(): Observable<DisciplineDto[]>
  {
    return this.http.get<DisciplineDto[]>(`${this.apiUrl}GetListDiscipline`)
  }



}
