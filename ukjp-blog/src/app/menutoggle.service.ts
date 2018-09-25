import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable()
export class MenutoggleService {
  public isOpen : boolean
  @Output() toggler = new EventEmitter<boolean>();
  public isFirst : boolean = false;
  constructor() {
    this.isOpen = false;
   }
   toggle() {
     this.isFirst = false;
     this.isOpen = !this.isOpen;
     this.toggler.emit(this.isOpen);
   }
   get open() {
     return this.isOpen;
   }
}
