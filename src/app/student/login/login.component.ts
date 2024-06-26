import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthRequest, AuthResponse, Profile } from '../interfaces/auth.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  authRequest: AuthRequest = {};
  
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ){}

  ngOnInit(): void {
    if (this.authService.token) {
      this.router.navigate(['/home']);
    }
  }
  
  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.authenticate(this.authRequest)
      .subscribe({
        next: profile => {
          this.snackBar.open(`Bienvenido ${profile.username}`, 'Cerrar', {
            duration: 5000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
          this.router.navigate(['home']);
        },
        error: error => {
            this.snackBar.open('Verifica tus credenciales. Si no tienes cuenta, únete :)', 'Cerrar', {
              duration: 5000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
        }
      });
  }
}
