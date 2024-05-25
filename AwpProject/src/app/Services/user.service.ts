import { HttpClient, HttpParams } from '@angular/common/http';
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

  isEmailAlreadyInUse(email: string) : Observable<boolean>
  {
    const params = new HttpParams().set('email',email);//Is necessary to pass an object with properties
    return this.http.get<boolean>(`${this.apiUrl}/IsEmailAlreadyUse`,{params});
  }

  isUserNameAlreadyInUse(userName:string): Observable<boolean>
  {
    const params = new HttpParams().set('userName',userName);
    return this.http.get<boolean>(`${this.apiUrl}/IsUserNameAlreadyUse`,{params});
   
   
  }
}
