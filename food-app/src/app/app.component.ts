import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'food-app';
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

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.isAdmin = false;
  }
}
