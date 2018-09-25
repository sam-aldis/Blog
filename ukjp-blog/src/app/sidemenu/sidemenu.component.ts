import { MenutoggleService } from '../menutoggle.service';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  public firstLoad : boolean = true;
  constructor(private menu : MenutoggleService) {
      
   }
  public isOpen : boolean = false;
  ngOnInit() {
    this.menu.toggler.subscribe((open : boolean) => { 
      this.firstLoad = this.menu.isFirst;
      this.isOpen = open 
    });
  }
  closeMenu() {
    this.menu.toggle();
  }
}
