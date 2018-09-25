import { MenutoggleService } from './menutoggle.service';
import { TagListComponent } from './tag-list/tag-list.component';
import { ConfigService } from './config.service';
import { TagsService } from './tags.service';
import { HttpModule } from '@angular/http';
import { PostsService } from './posts.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { EntryComponent } from './entry/entry.component';
import { CategoriesComponent } from './categories/categories.component';
import { PostViewerComponent } from './post-viewer/post-viewer.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';

const routes: Routes = [
  {
    path : 'home',
    component : HomeComponent
  },
  {
    path : 'about',
    component : AboutComponent
  },
  {
    path : '',
    redirectTo : '/home',
    pathMatch : 'full'
  },
  {
    path : 'tags',
    component : CategoriesComponent
  },
  {
    path : 'post/:id',
    component : PostViewerComponent
  },
  {
    path : 'tag/:tag',
    component : TagListComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    EntryComponent,
    CategoriesComponent,
    PostViewerComponent,
    TagListComponent,
    SidemenuComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpModule
  ],
  providers: [
    PostsService,
    TagsService,
    ConfigService,
    MenutoggleService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
