import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../Services/User/auth.service';
import { UserDto } from '../../Models/UserDTOS/UserDto';
import { Subscription } from 'rxjs';
import { ButtonOffCanvas } from '../../Models/Shared/Buttons/ButtonOffCanvas';
import { OffcanvasProjectService } from '../../Services/Shared/OffcanvasProject/offcanvas-project.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-offcanvas',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './offcanvas.component.html',
  styleUrl: './offcanvas.component.css'
})
export class OffcanvasComponent  implements OnInit,OnDestroy{
  public userData: UserDto| null= null;
  private  subscription: Subscription = new Subscription();
  buttons: ButtonOffCanvas[]= [];
  constructor(private autservice : AuthService, public _offcanvasProjectService:OffcanvasProjectService, private router: Router){
  }

  async ngOnInit(): Promise<void> {
    this.subscription = this.autservice.userInfo$.subscribe(userInfo=>{
      if(userInfo){
          this.userData = userInfo;
          
      }else{
        this.userData = null;
      }
    });  


    this._offcanvasProjectService.currentState.subscribe(buttons=>
      {
        this.buttons = buttons
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  goToPath(route:string)
  {
    if(route==='/home/projects')
      {
        
      const buttonNames:string[]=
      [
        'Work Breakdown Structure',
        'Credit Rules'
      ]
      this._offcanvasProjectService.removeButtons(buttonNames);
      }
    this.router.navigate([route])
    
  }
 

 
}
