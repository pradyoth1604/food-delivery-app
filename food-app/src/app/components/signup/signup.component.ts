import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { mockUsers } from '../../mock-users'; // Import mock users data

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  signup() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    // Check if username already exists
    const userExists = mockUsers.some(user => user.username === this.username);
    if (userExists) {
      this.errorMessage = 'Username already exists.';
      return;
    }

    const newUser = {
      id: mockUsers.length + 1,
      username: this.username,
      password: this.password,
      role: 'user'
    };

    mockUsers.push(newUser);

    // Navigate to login page after successful signup
    this.router.navigate(['/login']);
  }
}
