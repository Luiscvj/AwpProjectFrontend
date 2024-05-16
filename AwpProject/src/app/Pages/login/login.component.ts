import { Component, OnDestroy, OnInit, Renderer2, inject} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MyErrorStateMatcher } from '../../MyErrorStateMatcher';
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
import { UserService } from '../../Services/user.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit,OnDestroy{
  public formBuild = inject(FormBuilder);
  public apiUserService  = inject(UserService);
  
  constructor(private renderer: Renderer2, private router: Router){}


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
    const loginUserData:LoginUserDto =
    {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    console.log(new Date().toString());
    this.apiUserService.loginUser(loginUserData).subscribe(
      {
        next:(data)=>
          {
            console.log(data);
            if(data.statusCode === 200)
              {
                this.router.navigate(['/register']);
              }
            else
            {
              console.log("No se pudo loguear:  " + data.statusCode);
            }
          }
      })

  }


}
