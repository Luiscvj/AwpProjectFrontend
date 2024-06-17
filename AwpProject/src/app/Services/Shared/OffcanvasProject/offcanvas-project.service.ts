import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ButtonOffCanvas } from '../../../Models/Shared/Buttons/ButtonOffCanvas';

@Injectable({
  providedIn: 'root'
})
export class OffcanvasProjectService {
  private buttonSourceOffCanvas = new BehaviorSubject<ButtonOffCanvas[]>([]);
  currentState = this.buttonSourceOffCanvas.asObservable();
  constructor() { }

  updateButtons(buttons: ButtonOffCanvas[])
  {
    this.buttonSourceOffCanvas.next(buttons);
  }

  removeButtons(buttonNames: string[])
  {
      buttonNames.forEach(buttonName => {
          let updateButton = this.buttonSourceOffCanvas.value.filter(btn => btn.name !== buttonName);
          this.buttonSourceOffCanvas.next(updateButton);
      });
  }



}
