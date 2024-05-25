import { Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { OffcanvasService } from '../../Services/Offcanvasservice/offcanvas.service';
import { OffcanvasComponent } from '../offcanvas/offcanvas.component';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatIconModule,
    OffcanvasComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent  implements OnInit, OnDestroy{
    
    constructor(private _offCanvasService: OffcanvasService){}

    @HostListener('mouseenter') onMouseEnter(){
      this._offCanvasService?.show();     
    }

     @HostListener('mouseleave') onMouseLeave(){
      //this._offcanvasService.hide();
    } 
    ngOnInit(): void {   
     this._offCanvasService.initialize(); 
    }

    ngOnDestroy(): void {
      this._offCanvasService?.ngOnDestroy();
    }
}
