import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'food-app';
  isLoggedIn = false;
  isAdmin = false;
  role: string = '';
  flagToShowBanner = true;  //==> // New flag added

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.updateUserState();
  }

  ngDoCheck(): void {
    this.updateUserState();
  }

  updateUserState(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.isAdmin = this.authService.getUserRole() === 'admin';
      this.role = this.authService.getUserRole();
      this.flagToShowBanner = false;  //==> // Set flag based on login state
    } else {
      this.flagToShowBanner = true;  //==> // Set flag based on logout state
    }
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.flagToShowBanner = true; //==> // Set flag to true on logout
    console.log(this.flagToShowBanner);
  }
}
