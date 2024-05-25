import { Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { JwtDecode } from '../../Helpers/JwtDecode';
import { Router } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidebarComponent } from '../sidebar/sidebar.component';


import { AuthService } from '../../Services/auth.service';
import { UserDto } from '../../Models/UserDTOS/UserDto';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatSidenavModule,
    SidebarComponent   
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit , OnDestroy{
  private subscription: Subscription = new Subscription();
  public userData : UserDto |null= null; 
  constructor(private router:Router,private authService:AuthService)
  {}

  async ngOnInit(): Promise<void> {
    this.subscription = this.authService.userInfo$.subscribe(userInfo=>{
      if(userInfo){
        this.userData = userInfo;
      }else{
        this.userData = null;
      }
    })
    
  }
 

  @HostListener('mouseenter') onMouseEnter(){

  }

  @HostListener('mouserleave') onMouseLeave(){
    
  }

  ngOnDestroy(): void {
    this.authService.logOut();
  }
  
}
