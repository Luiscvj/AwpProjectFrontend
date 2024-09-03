import { Component, OnDestroy, OnInit, Renderer2, inject } from '@angular/core';
import { Router } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {  
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,} from '@angular/forms'
import { UserService } from '../../Services/User/user.service';
import { MyErrorStateMatcher } from '../../Helpers/MyErrorStateMatcher';
import { CustomValidators } from '../../Helpers/CustomValidators';
import { RegisterDto } from '../../Models/UserDTOS/RegisterDto';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule, 
            MatInputModule,
            FormsModule,
            ReactiveFormsModule,
            MatButtonModule,
            MatIconModule,
            CommonModule
          ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit,OnDestroy{
  public formBuild = inject(FormBuilder)
  public _apiUserService = inject(UserService)
  
  public registerForm: FormGroup = this.formBuild.group(
    {
      userName: new FormControl('',{
        validators : [Validators.required],
        asyncValidators: [CustomValidators.userNameInUse(this._apiUserService)],
        updateOn: 'blur'
      }),
      email: new FormControl('',{
          validators : [Validators.required, Validators.email],
          asyncValidators: [CustomValidators.userExists(this._apiUserService)],
          updateOn: 'blur'//To validate when lost the focus on the email field
      }),
      password: new FormControl('',[Validators.required,CustomValidators.strongPassword()]),
      
    })
  matcher = new MyErrorStateMatcher();
  hide = true;
  constructor(private router:Router, private renderer:Renderer2){}
  
  ngOnInit(): void {
    this.renderer.addClass(document.body, 'custom-body-style');
    
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'custom-body-class');
  }
  signUp(){
    const registerUserData = new  RegisterDto(
      this.registerForm.value.userName,
      this.registerForm.value.email,
      this.registerForm.value.password
    );
    
     console.log(registerUserData);
    
    this._apiUserService.registerUser(registerUserData).subscribe(
      {
        next:(data)=>
          {
            console.log(data);
            if(data.statusCode === 201){
              alert( `User created successfully, please confirm your email ${registerUserData.email}`);
              this.router.navigate(['/login']);
            }else{
              alert("An error was ocurred, please attempt later");
              
            }

          }
      })
  }

  


  
}
