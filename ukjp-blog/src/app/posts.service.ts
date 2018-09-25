import { ConfigService } from './config.service';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PostsService {
  constructor(private http: Http, private Config : ConfigService) { }

  public posts(page : number): Observable<Response> {
    const httpCall = this.http.get(this.Config.api_url + 'blog/posts/' + page);
    return httpCall;
  }
  public getPost(id: number): Observable<Response> {
    const httpCall = this.http.get(this.Config.api_url + 'blog/post/' + id);
    return httpCall;
  }
}
