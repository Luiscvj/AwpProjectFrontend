import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appsettings } from '../../Settings/appsettings';
import { CreditRuleDto } from '../../Models/CreditRuleDTOS/CreditRuleDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditRuleService {
  apiUrl: string = appsettings.apiUrl + 'CreditRule/'
  constructor(private http: HttpClient){}


  PostCreditRule(model: CreditRuleDto): Observable<any>
  {
      return this.http.post<any>(`${this.apiUrl}`,model)
  }

  GetListCreditRules():Observable<CreditRuleDto[]>
  {
    return this.http.get<CreditRuleDto[]>(`${this.apiUrl}GetListCreditRules`)
  }

  GetListCreditRulesByProject(projectId: number): Observable<CreditRuleDto[]>
  {
    const params = new HttpParams().set('projectId', projectId);
    return this.http.get<CreditRuleDto[]>(`${this.apiUrl}GetListCreditRulesByProject`,{params});
  }

  DeleteCreditRule(creditRuleId: number): Observable<any>
  {
    const params = new HttpParams().set('creditRuleId', creditRuleId);
    return this.http.delete<any>(`${this.apiUrl}`,{params});
  }
  
}
