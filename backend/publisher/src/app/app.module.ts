import { LoginComponent } from './login/login.component';
import { ApiService } from './api.service';

import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ComposerComponent } from './composer/composer.component';
import { EditComponent } from './edit/edit.component';

const routes = [
  {
    path : '',
    redirectTo : '/composer',
    pathMatch : 'full'
  },
  {
    path : 'new',
    redirectTo : '/composer',
    pathMatch : 'full'
  },
  {
    path : 'edit',
    component : EditComponent
  },
  {
    path : 'composer',
    component : ComposerComponent
  },
  {
    path : 'login',
    component : LoginComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ComposerComponent,
    LoginComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpModule,
  ],
  providers: [
    ApiService,
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
