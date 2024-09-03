import { AbstractControl,AsyncValidator,AsyncValidatorFn,ValidationErrors,ValidatorFn } from "@angular/forms";
import { UserService } from "../Services/User/user.service";
import { Observable,catchError,map, of } from "rxjs";


export class CustomValidators{
    static strongPassword(): ValidatorFn{
        return (control: AbstractControl): ValidationErrors | null =>{
            const value = control.value
            if(!value) return null;
          

            const hasUpperCase = /[A-Z]/.test(value);// to evaluate the user input
            const hasLowerCase = /[a-z]/.test(value);
            const hasNumeric = /[0-9]/.test(value);
            const hasSpecialChar = /[!@#$%&]/.test(value);
            const isValidLength = value.length > 8;
            const noSpaces = !/\s/.test(value);//no spaces

            const isValidPassword = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar && isValidLength && noSpaces;
            
            return  !isValidPassword ? { strongPassword: true}: null;
            
        }
        
    }

    static userExists(user: UserService): AsyncValidatorFn{
        return (control: AbstractControl): Observable<ValidationErrors | null> =>{
           return  user.isEmailAlreadyInUse(control.value)
                .pipe(
                    map(userExists => userExists ? {userExists:true} : null)
                );    
                
               
        }
    }

    static userNameInUse(user: UserService):AsyncValidatorFn{
        return (control: AbstractControl): Observable<ValidationErrors | null> =>{
           return   user.isUserNameAlreadyInUse(control.value)    
                    .pipe(
                    map(userNameExists => userNameExists ? {userNameInUse: true } : null),
                    
                );  
        }
    }

    static maxDigit(maxDigits: number):ValidatorFn
    {
        return (control:AbstractControl):{[key:string]:any}|null =>
            {
                const input = control.value;
                if(input)
                    {

                        const isValid = input.toString().length <= maxDigits;
                        return isValid ? null :{'maxDigit':{value: control.value}}
                    }
                return null
            }
    }
}