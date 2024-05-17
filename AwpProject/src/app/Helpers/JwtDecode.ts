import { Injectable } from "@angular/core";
import { jwtDecode } from "jwt-decode";
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
                console.log(cookiePair);
                if(cookieName === cookiePair[0].trim())
                    {
                        return decodeURIComponent(cookiePair[1]);
                    }
            }
            return "can't decode de cookie";
    }

    decode(token:string)
    {
        
        try
        {

            const decodeToken = jwtDecode(token);
            return decodeToken;
        }catch(error)
        {
            console.log(error);
        }
        return "can't decode";
    }

   
}