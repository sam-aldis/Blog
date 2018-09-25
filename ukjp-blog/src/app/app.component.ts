import { MenutoggleService } from './menutoggle.service';
import { EventEmitter } from 'events';
import { Component, Output } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UKJP-Blog';
  public isOpen : boolean = false;
  constructor(private menu : MenutoggleService) {
  }
  ngOnInit() {
      this.menu.toggler.subscribe((open) => this.isOpen = open);
  }
}
