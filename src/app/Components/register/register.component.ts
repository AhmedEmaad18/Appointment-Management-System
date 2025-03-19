import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  username: string = '';
  errorMessage: string = '';
  token: string | undefined; // Ensure this is a string

  constructor(private authService: AuthService, private router: Router) { }
  resolved(cap:string){
    this.token=cap;
  }
  register() {
    if (!this.email || !this.password || !this.username || !this.token) {
      this.errorMessage = 'All fields are required, including Captcha.';
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
