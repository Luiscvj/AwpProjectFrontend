import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../Services/auth.service';
import { UserDto } from '../../Models/UserDTOS/UserDto';
import { Subscription } from 'rxjs';


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

  constructor(private autservice : AuthService){
  }

  async ngOnInit(): Promise<void> {
    this.subscription = this.autservice.userInfo$.subscribe(userInfo=>{
      if(userInfo){
          this.userData = userInfo;
          console.log(userInfo);
      }else{
        this.userData = null;
      }
    });  
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


 
}
