import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from '../Models/UserDTOS/UserDto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService { //This class allows me to manage  the user information  secure
  private userInfoSubject: BehaviorSubject<UserDto | null> = new BehaviorSubject<UserDto | null>(null);
  userInfo$ = this.userInfoSubject.asObservable();
  constructor(private router:Router) {
    this.loadUserInfo();
   }

  setUserInfo(user:UserDto) 
 {
    this.userInfoSubject.next(user);
    if(this.userInfo$){
      this.saveUserInfo();
      return true
    }
    return false
 }

 async getUserInfo() : Promise<UserDto| null>
 {  
   return this.userInfoSubject.value;
    
    

 }

 logOut(){
  this.userInfoSubject.next(null);
  sessionStorage.removeItem('userInfo');
  this.router.navigate(['/login']);
 }

 private saveUserInfo(): void{
  const userInfo = this.userInfoSubject.value;
  if(userInfo){
     sessionStorage.setItem('userInfo',JSON.stringify(userInfo));
  }
 }

 private  loadUserInfo():void{
  const userInfo = sessionStorage.getItem('userInfo');
  if(userInfo){
    this.userInfoSubject.next(JSON.parse(userInfo) as UserDto);
  }
 }


}
