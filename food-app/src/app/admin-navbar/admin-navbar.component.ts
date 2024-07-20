import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit, DoCheck {
  isLoggedIn = false;
  isAdmin = false;
  role: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.isAdmin = this.authService.getUserRole() === 'admin';
      this.role = this.authService.getUserRole();
    }
  }

  ngDoCheck(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.isAdmin = this.authService.getUserRole() === 'admin';
      this.role = this.authService.getUserRole();
    }
  }

  home(): void {
    console.log("Navigating to home");
  }

  manageUsers(): void {
    console.log("Navigating to manage users");
  }

  manageOrders(): void {
    console.log("Navigating to manage orders");
  }

  manageRestaurants(): void {
    console.log("Navigating to manage restaurants");
  }

  manageMenus(): void {
    console.log("Navigating to manage menus");
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.isAdmin = false;
    console.log("Logged out");
  }
}
