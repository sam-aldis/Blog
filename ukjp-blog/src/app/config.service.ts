import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  constructor() { }
  get api_url() {
    return 'https://service.ukjp-design.com:6565/';
  }
}
