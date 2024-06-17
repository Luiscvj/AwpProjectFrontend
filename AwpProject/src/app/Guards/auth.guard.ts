import { CanActivateFn } from '@angular/router';
import { AuthService } from '../Services/User/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async  (route, state) => {
  const authService = inject(AuthService);
  const userExists = await authService.getUserInfo();
   try{
      if(userExists){
        return true
      }else{
        authService.logOut();
        return false
      }
   }catch(error){
    return false;
   }


};
