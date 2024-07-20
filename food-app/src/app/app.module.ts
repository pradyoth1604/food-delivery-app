// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TopnavbarComponent } from './topnavbar/topnavbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { AdminNavbarComponent } from '../app/admin-navbar/admin-navbar.component';
import { UserComponent } from './components/user/user.component';
import { SignupComponent } from './components/signup/signup.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { MenuComponent } from './menu/menu.component';
import { AdminRestaurantComponent } from './admin-restaurant/admin-restaurant.component';
import { RestaurantService } from '../app/restaurant.service';
import { AdminRestaurantService } from './services/admin-restaurant.service';
import { AdminMenuComponent } from './admin-menu/admin-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopnavbarComponent,
    NavbarComponent,
    LoginComponent,
    ForbiddenComponent,
    AdminNavbarComponent,
    UserComponent,
    SignupComponent,
    RestaurantComponent,
    MenuComponent,
    AdminRestaurantComponent,
    AdminMenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [RestaurantService, AdminRestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
