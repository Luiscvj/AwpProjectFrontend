import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { Observable } from 'rxjs';
import { LoginUserDto } from '../Models/UserDTOS/LoginUserDto';
import { RegisterDto } from '../Models/UserDTOS/RegisterDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl:string = appsettings.apiUrl +"User"
  constructor() { }

  loginUser(model: LoginUserDto) : Observable<any>
  {
    return  this.http.post<any>(`${this.apiUrl}/LoginUser`, model,{withCredentials: true});
  };
  registerUser(model: RegisterDto) : Observable<any>
  {
    return this.http.post<any>(`${this.apiUrl}/RegisterUser`,model)
  }
}
