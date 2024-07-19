import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.role = this.authService.getUserRole();
  }

  login(): void {
    this.flagToShowBanner = true;
    console.log(this.flagToShowBanner);
    this.authService.login(this.username, this.password).subscribe(success => {
      if (success) {
        this.isLoggedIn = true;
        this.role = this.authService.getUserRole();
        this.authService.flagToShowBanner = false; // Hide banner on login
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || (this.role === 'admin' ? '/admin' : '/user');
        this.router.navigate([returnUrl]);
      } else {
        alert('Invalid credentials');
      }
    });
  }
}
