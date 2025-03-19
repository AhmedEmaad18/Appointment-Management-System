import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Corrected from styleUrl to styleUrls
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  username: string = '';
  errorMessage: string = ''; // To hold error messages

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    if (!this.email || !this.password || !this.username) {
      this.errorMessage = 'All fields are required.';
      return;
    }

    this.authService.register(this.email, this.password, this.username)
      .then(user => {
        console.log('Registered:', user);
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.error('Registration error:', error);
        this.errorMessage = error.message; 
      });
  }
}
