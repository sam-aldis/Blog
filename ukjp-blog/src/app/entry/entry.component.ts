import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
  constructor() { }
  @Input() data;
  @Input() view;
  ngOnInit() {
    if(this.data.tags[0] == '') {
      this.data.tags = ['ukjp'];
    } else{
      this.data.tags.push('ukjp');
    }
    if (this.view === 'home') {
      this.view = false;
    } else {
      this.view = true;
    }
  }

}
