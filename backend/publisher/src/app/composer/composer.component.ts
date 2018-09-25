import { ApiService } from '../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-composer',
  templateUrl: './composer.component.html',
  styleUrls: ['./composer.component.css']
})
export class ComposerComponent implements OnInit {
  private textArea;
  constructor(private api: ApiService) { }
  public publishPost(body,
                     author,
                     title,
                     subtitle,
                     headerImage,
                     profileImage,
                     tags) {
    const post_data = {
      body : body,
      author : author,
      title : title,
      subtitle : subtitle,
      headerImage : headerImage,
      profileImage : profileImage,
      published : true,
      tags : tags.split(', ')
    }
    this.api.newPost(post_data);
  }
  public savePost(body,
                  author,
                  title,
                  subtitle,
                  headerImage,
                  profileImage,
                  tags) {
      const a = 1;
  }
  ngOnInit() {
    this.api.checkToken(localStorage.getItem('token'));
  }
  ngAfterViewInit() {
    this.textArea = document.getElementById('body');
  }
  public addFromButton(button) {
    if(button === 'image') {
      this.textArea.value += ' <img src="" />';
    }
    if(button === 'link') {
      this.textArea.value += ' <a href=""></a>';
    }
    if(button === 'style') {
      this.textArea.value += ' <style type="text/css"> </style>';
    }
  }
}
