import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false;
  role: string = '';
  flagToShowBanner = true;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.role = this.authService.getUserRole();
  }

  login(): void {
    this.flagToShowBanner = true;
    console.log(this.flagToShowBanner)
    this.authService.login(this.username, this.password).subscribe(success => {
      if (success) {
        this.isLoggedIn = true;
        this.role = this.authService.getUserRole();
        this.authService.flagToShowBanner = false; //==> // Hide banner on login
        if (this.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      } else {
        alert('Invalid credentials');
      }
    });
  }
}
