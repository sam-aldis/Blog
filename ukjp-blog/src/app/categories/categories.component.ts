import { TagsService } from '../tags.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  public alltags = [];
  constructor(private tags : TagsService) { }

  ngOnInit() {
    this.tags.allTags.subscribe((res) => {
      this.alltags = res.json();
    })
  }

}
