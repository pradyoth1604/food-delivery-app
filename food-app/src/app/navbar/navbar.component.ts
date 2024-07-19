import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {
  isLoggedIn = false;
  isAdmin = false;
  role: string = '';
  flagToShowBanner = true;

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
    this.flagToShowBanner = true;
    console.log(this.flagToShowBanner);
  }
  restaurant(): void {
    this.flagToShowBanner = true;
    console.log(this.flagToShowBanner);
  }

  login(){
    this.flagToShowBanner=false;
    console.log(this.flagToShowBanner)
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.isAdmin = false;
    console.log(this.flagToShowBanner);
  }
}
