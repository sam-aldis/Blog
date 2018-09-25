import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ApiService {
  constructor(private http: Http, private router: Router) { }
  private username;
  private password;

  public login(username, password) {
    this.username = username;
    this.password = password;
    this.http.post('/login/get_token', {
                                          username : this.username,
                                          password : this.password
                                        })
    .subscribe((res) => {
      const data = res.json();
      if (data.valid) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        this.router.navigate(['/composer']);
      } else {
        // TODO: make this more user friendly
        alert('username or password incorrect, please try again');
      }
    });
  }

  public checkToken(token): void {
    if (!token) {
      this.router.navigate(['/login']);
    }
    this.http.post('/login/check', {token : token})
    .subscribe((res) => {
      const data = res.json();
      if (!data.valid) {
        this.router.navigate(['/login']);
      }
    });
  }

  public newPost(post_data) {
    this.http.post('/blog/new/post', post_data)
      .subscribe((res) => {
        var data = res.json();
        if(data.code === 200) {
          document.location.href = '/';
        } else {
          alert("error while posting");
        }
      })
  }
}
