import {  AfterContentChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild, } from '@angular/core';

import { Router } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ProjectsComponent } from './ChildComponents/projects/projects.component';
import { RouterModule } from '@angular/router'; //
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../Services/User/auth.service';
import { UserDto } from '../../Models/UserDTOS/UserDto';
import { Subscription } from 'rxjs';
import { HomeHeaderProjectService } from '../../Services/Shared/HomeHeaderProject/home-header-project.service';
import { ProjectDto } from '../../Models/ProjectDTOS/ProjectDto';
import { OffcanvasProjectService } from '../../Services/Shared/OffcanvasProject/offcanvas-project.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatSidenavModule,
    SidebarComponent,
    ProjectsComponent,
    RouterModule,
    MatMenuModule,
    MatButtonModule,
  
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy{
 
  private subscription: Subscription = new Subscription();
  showDropDown = true
  public menu: any ;
  public userData : UserDto = new UserDto();
  public project : ProjectDto = new ProjectDto()
  
  constructor(private router:Router, private authService:AuthService, private _homeHeaderProjectService: HomeHeaderProjectService)
  {
  }
  async ngOnInit(): Promise<void> {
    this.subscription = this.authService.userInfo$.subscribe(userInfo=>{
      if(userInfo){
        this.userData = userInfo;
      }else{
        this.userData = new UserDto();
      }
    })


    this._homeHeaderProjectService.currentProjectState.subscribe(
      {
        next:(project)=>
          {
            this.project = project; 
            if(project)
              {
              
                this.showDropDown = !this.showDropDown;
             
              }               
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
