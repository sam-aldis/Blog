import { TagsService } from '../tags.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {

  constructor(private route: ActivatedRoute, private tagservice : TagsService) { }
  public tag;
  public entries;
  private page = 0;
  private noOfPosts;
  private noOfPages;
  public loadPage() {
    this.tagservice.postsForTag(this.tag,this.page).subscribe((res) => {
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
      this.loadPage();
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
    this.loadPage();
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tag = params['tag'];
      this.loadPage();
    });
  }

}
