import { PostsService } from './../posts.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-viewer',
  templateUrl: './post-viewer.component.html',
  styleUrls: ['./post-viewer.component.css']
})
export class PostViewerComponent implements OnInit {
  private id;
  public post_data;

  constructor(private route: ActivatedRoute, private pservice: PostsService) { }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      const pObservable = this.pservice.getPost(this.id).subscribe((res) => {
        this.post_data = res.json();
        if(this.post_data.tags[0] == '') {
          this.post_data.tags = ['ukjp'];
        } else{
          this.post_data.tags.push('ukjp');
        }
      });
    });
  }

}
