import { PostsService } from '../posts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public entries = [];
  public display = '';
  private noOfPosts : number;
  private noOfPages : number;
  private page = 0;
  constructor(private posts: PostsService) {
  }
  private loadPosts() {
    const pobservable = this.posts.posts(this.page);
    pobservable.subscribe((res) => {
      var decoded : Array<any>;
      decoded = res.json();
      this.noOfPosts = decoded[0].count;
      this.noOfPages = Math.ceil(this.noOfPosts / 5) - 1;
      decoded.splice(0,1);
      this.entries = decoded;
    });
  }
  public nextPage() {
    if((this.page) < this.noOfPages)
    {
      this.page += 1;
      let height = window.innerHeight;
      window.scroll(0,0-height);
      this.loadPosts();
    }
  }
  public checkScroll() {
    var maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var curScroll = window.scrollY;

  }
  public lastPage() {
    if(this.page > 0) this.page -= 1;
    let height = window.innerHeight;
    window.scroll(0,0-height);
    this.loadPosts();
  }
  ngOnInit() {
    this.loadPosts();
  }

}
