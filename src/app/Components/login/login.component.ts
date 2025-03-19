import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string='';
  password: string='';
  role: string | null = null;

  constructor(private authService: AuthService,private router:Router) { }

  login() {
    this.authService.login(this.email, this.password)
      .then(user => {
        console.log('Logged in:', user);

        this.authService.getUserRoleByEmail(this.email).subscribe(role => {
          this.role = role;
          console.log('User  role:', this.role);

          if (this.role === 'doctor') {
            this.router.navigate(['/doctor']);
          } else if (this.role === 'patient') {
            this.router.navigate(['/user-Appointment']);
           } else if (this.role === 'admin') {
              this.router.navigate(['/admin']);
          } else {
            alert('not user');
          }
        });
      })
      .catch(error => {
        if (error.code === 'auth/too-many-requests') {
          console.error('Too many requests. Please try again later.');
          alert('Too many failed login attempts. Please try again later.');
        } else {
          console.error('Login error:', error);
        }
      });
  }
  loginWithGoogle() {
    this.authService.loginWithGoogle()
      .then(user => {
        console.log('Logged in with Google:', user);
      })
      .catch(error => {
        console.error('Google login error:', error);
      });
  }
}
