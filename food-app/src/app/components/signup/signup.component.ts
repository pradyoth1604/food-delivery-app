// src/app/components/signup/signup.component.ts
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

    // Create new user
    const newUser = {
      id: mockUsers.length + 1,
      username: this.username,
      password: this.password,
      role: 'user' // Default role for new signup
    };

    // Mock API call to add user (in real app, this would be replaced with backend integration)
    mockUsers.push(newUser);

    // Navigate to login page after successful signup
    this.router.navigate(['/login']);
  }
}
