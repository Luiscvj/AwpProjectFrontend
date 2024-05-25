import { Injectable, OnDestroy } from '@angular/core';
import  * as bootstrap from 'bootstrap';
//when bootsrap is loaded in the navigator , define an object calls bootstrap and then we can use it

@Injectable({
  providedIn: 'root'
})
export class OffcanvasService  implements OnDestroy  {
  private offcanvasElement: any;

  constructor() {}
  
  initialize() {
    setTimeout(() => {
      this.offcanvasElement = document.getElementById('offcanvasAwp');
      if (this.offcanvasElement) {
        this.offcanvasElement = new bootstrap.Offcanvas(this.offcanvasElement);
        console.log('Eligiendo el offcanvas ' + this.offcanvasElement);
      } else {
        console.error('Offcanvas element not found');
      }
    }, 0);
  }


   show() {
    if(this.offcanvasElement){
     this.offcanvasElement.show();
     return true
    }
    return false
   }
   hide() : void {
      if(this.offcanvasElement){
        this.offcanvasElement.hide();
      }

   }

   ngOnDestroy(): void {
     this.offcanvasElement = null;
     console.log("Destroy offServiceeeeee");
   }
   
   

   

   
}
