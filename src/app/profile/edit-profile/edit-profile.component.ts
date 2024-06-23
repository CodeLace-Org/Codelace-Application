import { AuthService } from './../../student/services/auth.service';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentService } from '../../student/services/student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from '../../student/interfaces/auth.interface';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  student?: Profile;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ){}

  form: FormGroup = this.fb.group({
    // username: [, [Validators.required, Validators.pattern('^[a-zA-Z0-9_]*$')]],
    email: [, [Validators.required, Validators.email]],
    description: [, [Validators.required, Validators.minLength(8)]],
    status: [, [Validators.required, Validators.minLength(8)]],
  });

  formPassword: FormGroup = this.fb.group({
    pwd: [, [Validators.required, Validators.minLength(8)]],
    newPassword: [, [Validators.required, Validators.minLength(8)]],
    confirmPassword: [, [Validators.required, Validators.minLength(8)]],
  });

  controlHasError(control: string, error: string) {
    return this.form.controls[control].hasError(error);
  }

  controlTouched(controlName: string):boolean {
    const control = this.form.get(controlName);
    return control && control.touched || false;
  }

  ngOnInit(): void {
    const student = this.authService.user;
    if (student) {
      this.studentService.getStudentById(student.id).subscribe({
        next: (studentProfile: Profile) => {
          this.student = studentProfile;
          // this.form.patchValue(studentProfile);
        },
        error: error => {
          console.error(error);
        }
      });
    }
  }

  updateProfile(): void {
    if(this.form.invalid || !this.student){
      return;
    }

    const formValue = this.form.value;

    const studentUpdt = {
      username: this.student?.username,
      email: formValue.email,
      description: formValue.description,
      status: formValue.status
    }

    this.studentService.putStudentById(this.student?.id, studentUpdt)
      .subscribe({
        next: profile => {
          console.log('Formulario valido');
          this.snackBar.open('Perfil actualizado', 'Cerrar', {
            duration: 5000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
          this.router.navigate(['my-profile']);
        },
        error: error => {
          this.snackBar.open(error, 'Cerrar', {
            duration: 5000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
        }
      });
  }

  updatePassword(): void {
    if(this.formPassword.invalid || !this.student){
      return;
    }
    const formValue = this.formPassword.value;
    const updateRequest = {
      pwd: formValue.password,
      newPassword: formValue.newPassword,
      confirmPassword: formValue.confirmPassword
    }

    this.studentService.putPasswordStudentById(this.student.id, updateRequest)
      .subscribe({
        next: profile => {
          console.log('Formulario valido');
          this.snackBar.open('Contraseña actualizada', 'Cerrar', {
            duration: 5000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
          this.router.navigate(['my-profile']);
        },
        error: error => {
          this.snackBar.open(error, 'Cerrar', {
            duration: 5000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
        }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
    this.snackBar.open('Sesión cerrada', 'Cerrar', {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }
}