import { ConfigService } from './config.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TagsService {

  constructor(private http : Http, private Config : ConfigService) { }

  get allTags() {
    const httpCall = this.http.get(this.Config.api_url + 'blog/tags')
    return httpCall;
  }
  public postsForTag(tag, page) {
    const httpCall = this.http.get(this.Config.api_url + 'blog/tag/' + tag + '/' + page);
    return httpCall;
  }
}
