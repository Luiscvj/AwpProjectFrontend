import { Component, NgModule, OnDestroy, OnInit, Renderer2, inject} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MyErrorStateMatcher } from '../../Helpers/MyErrorStateMatcher';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUserDto } from '../../Models/UserDTOS/LoginUserDto';
import { UserService } from '../../Services/User/user.service';
import { JwtDecode } from '../../Helpers/JwtDecode';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../Services/User/auth.service';
import { UserDto } from '../../Models/UserDTOS/UserDto';




@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,MatButtonModule,
    MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})




export class LoginComponent implements OnInit,OnDestroy{
  public formBuild = inject(FormBuilder);
  public _apiUserService  = inject(UserService);
  public _jwtDecode = inject(JwtDecode);
  hide = true;
  
  constructor(private renderer: Renderer2, private router: Router, private authService: AuthService){}


  public loginForm:FormGroup =  this.formBuild.group(
    {
      email: new FormControl('',[Validators.required,Validators.email]),//To provide the errors in the client's side
      password: new FormControl('',[Validators.required])
    });

  matcher = new MyErrorStateMatcher();
    
    
  ngOnInit(): void {
    this.renderer.addClass(document.body,'custom-body-style');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'custom-body-style');
  }

   login()
  {

    const loginUserData = new LoginUserDto(
      this.loginForm.value.email,
      this.loginForm.value.password
    );  
    
    this._apiUserService.loginUser(loginUserData).subscribe(
      {      
        next:async (data)=>
          {
            if(data.statusCode === 200)
              {
                 
                let token = this._jwtDecode.getCookie('token');
                if(token)
                  {
                    this.authService.setToken(token);
                  
                    let userData = await  this._jwtDecode.getUserClaims(token);
                    
                    let isUserSet = await  this.authService.setUserInfo(userData);
                    if(isUserSet)
                      {

                        this.router.navigate(['/home']);
                      }
                  }
                  
              
              }
              else
              {
                alert( data.message);
              }
          }
      })

  }

  toRegister()
  {
    this.router.navigate(['/register'])
  }


}
