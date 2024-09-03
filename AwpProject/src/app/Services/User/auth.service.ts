import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from '../../Models/UserDTOS/UserDto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService { //This class allows me to manage  the user information  secure
  private userInfoSubject: BehaviorSubject<UserDto|null> = new BehaviorSubject<UserDto| null>(null);
  userInfo$ = this.userInfoSubject.asObservable();

  private tokenUserSubject: BehaviorSubject<string|null> = new BehaviorSubject<string|null>(null);
  tokenUser$ = this.tokenUserSubject.asObservable();//tokenUser$ is the suscriptor

  constructor(private router:Router) {
    this.loadUserInfo();
    this.loadToken();
   }

  setUserInfo(user:UserDto) 
 {
    this.userInfoSubject.next(user);
    if(this.userInfoSubject.value){
      this.saveUserInfo();
      return true
    }
    return false
 }

 async getUserInfo() : Promise<UserDto|null>
 {  
   return   this.userInfoSubject.value;   

 }

 logOut(){
  this.userInfoSubject.next(null);
  this.tokenUserSubject.next(null);
  sessionStorage.removeItem('userInfo');
  sessionStorage.removeItem('authToken');
  this.router.navigate(['/login']);
 }


 private saveUserInfo(): void{
  const userInfo = this.userInfoSubject.value;
  if(userInfo){
    console.log(userInfo);
     sessionStorage.setItem('userInfo',JSON.stringify(userInfo));
  }
 }

 private  loadUserInfo():void{
  const userInfo = sessionStorage.getItem('userInfo');
  if(userInfo){
    this.userInfoSubject.next(JSON.parse(userInfo) as UserDto);
  }
 }



 setToken(token:string):void
 {
    this.tokenUserSubject.next(token);
    if(this.tokenUserSubject.value)
      {
        this.saveToken();
      }
 }



 private saveToken():void
 {
    const tokenInfo =this.tokenUserSubject.value;
    if (tokenInfo)
      {
        sessionStorage.setItem('authToken',JSON.stringify(tokenInfo));
      }
 }

 loadToken():void
 {
    const tokenInfo = sessionStorage.getItem('authToken');
    if(tokenInfo)
      {
        this.tokenUserSubject.next(JSON.parse(tokenInfo));
      }
 }

  getToken(): string|null
 {
  return this.tokenUserSubject.value
 }


}
