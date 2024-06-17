import { Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";
import { UserDto } from "../Models/UserDTOS/UserDto";
import { CustomJwtPayload } from "./CustomJwtPayload";
import { RolDto } from "../Models/RolDTOS/RolDto";
@Injectable({
    providedIn: 'root'
  })
export class JwtDecode 
{
    constructor(){}

   getCookie(cookieName:string)
    { 
        let cookieArr = document.cookie.split(";");
        for(let i = 0; i < cookieArr.length; i++)
            {
                let cookiePair = cookieArr[i].split("=");
                if(cookieName === cookiePair[0].trim())
                    {
                        return decodeURIComponent(cookiePair[1]);
                    }
            }
            return "can't decode de cookie";
    }

    decode(token:string) : CustomJwtPayload | null
    {
        
        try
        {
            return   jwtDecode<CustomJwtPayload>(token);//Allow to personalize my token payload
            
        }catch(error)
        {
            console.log(error);
        }
        return null;
    }


    async getUserClaims(token: string): Promise<any>{
        const decodeToken = await this.decode(token);
       console.log(decodeToken);
        let roles: RolDto[]= [];
       
    
        if(decodeToken && decodeToken['roles']){
            const rolesClaims = decodeToken['roles'];           
            if(Array.isArray(rolesClaims)){
                roles = rolesClaims.map(role => role);              
            }else{
                roles.push(new RolDto(rolesClaims));//If is a string, i just add to the array.            
            }
            let userDto = new  UserDto(
                decodeToken.uid,
                decodeToken.username,
                decodeToken.email,
                roles
            )
            return userDto;
        }
        return null;   
   }
}