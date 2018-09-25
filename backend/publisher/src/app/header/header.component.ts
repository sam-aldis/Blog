import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) { }
  @Input() title;

  ngOnInit() {
  }
  navigate(page: string) {
    this.router.navigate(['/' + page]);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
