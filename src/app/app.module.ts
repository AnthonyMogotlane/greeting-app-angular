import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { GreetedComponent } from './greeted/greeted.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GreetedComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "home", component: HomeComponent },
      { path: "greeted", component: GreetedComponent },
      { path: " ", redirectTo: "home" },
      { path: "**", redirectTo: "home" }
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
