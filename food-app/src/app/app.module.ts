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
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { SignupComponent } from './components/signup/signup.component';
import { RestaurantComponent } from './restaurant/restaurant.component'; // Ensure SignupComponent is imported
import { RestaurantService } from './restaurant.service';
import { MenuComponent } from './menu/menu.component';
import { OrderHistoryComponent } from './order-history/order-history.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopnavbarComponent,
    NavbarComponent,
    LoginComponent,
    ForbiddenComponent,
    AdminComponent,
    UserComponent,
    SignupComponent,
    RestaurantComponent,
    MenuComponent,
    OrderHistoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [RestaurantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
