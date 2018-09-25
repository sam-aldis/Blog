import { MenutoggleService } from '../menutoggle.service';
import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private menu : MenutoggleService) { }
  @Input() title: string;
  ngOnInit() {
  }
  navigate(page: string) {
    this.router.navigate(['/' + page]);
  }
  toggleSidebar() {
    this.menu.toggle();
  }
}
