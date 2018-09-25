import { ApiService } from '../api.service';
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private api: ApiService) { }
  ngOnInit() { }

  public login(username, password) {
    this.api.login(username, password);
  }

}
