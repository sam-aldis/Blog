import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private api: ApiService) {}
  title = 'Composer';
  private token: string;
  OnInit() {
    this.token = localStorage.getItem('token');
    if (!this.token) {
      this.router.navigate(['/login']);
    } else {
      this.api.checkToken(this.token);
    }
  }
}
