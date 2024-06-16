import { AuthService } from '../services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { passwordMatchValidator } from '../validators/validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ){}

  form: FormGroup = this.fb.group({
    username: [, [Validators.required, Validators.pattern('^[a-zA-Z0-9_]*$')]],
    email: [, [Validators.required, Validators.email]],
    pwd: [, [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$')]],
    confirmPassword: [, [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$')]],
  }, { validator: passwordMatchValidator });

  errors: string[] = [];
  passwordVisible = false;

  controlHasError(control: string, error: string) {
    return this.form.controls[control].hasError(error);
  }

  controlTouched(controlName: string):boolean {
    const control = this.form.get(controlName);
    return control && control.touched || false;
  }

  signup() {
    if(this.form.invalid) {
      return;
    }
    const formValue = this.form.value;

    this.authService.signup(formValue)
      .subscribe({
        next: profile => {
          this.authService.authenticate({
            email: formValue.email,
            pwd: formValue.pwd
          })
            .subscribe(profile => {
              this.snackBar.open(`Bienvenido $profile.username`, 'Cerrar', {
                duration: 5000,
                verticalPosition: 'bottom',
                horizontalPosition: 'center'
              });
              this.router.navigate(['']);
            })
        },
        error: error => {
          if (error.error.status === 400) {
            this.errors.push(error.error.detail);
          } else if (error.error.status === 422) {
            this.errors.push(...error.error.errors);
          }
        }
      });
  }
}
