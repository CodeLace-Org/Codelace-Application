import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthRequest, AuthResponse, Profile, SignupRequest } from './../interfaces/auth.interface';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

const authKey = 'codelace_auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _auth?: AuthResponse;

  constructor(private http: HttpClient) {
    const authString = localStorage.getItem(authKey);

    if(authString) {
      this._auth = JSON.parse(authString);
    }
  }

  authenticate(authRequest: AuthRequest) {
    return this.http.post<AuthResponse>(`${environment.apiURL}/auth/token`, authRequest)
      .pipe(
        map(response => {
          console.log('Response from server:', response);
          localStorage.setItem(authKey, JSON.stringify(response));
          this._auth = response;
          return response.student;
        }),
        catchError(error => {
          console.error('Error during authentication: ', error);
          return throwError(() => error);
        })
      );
  }

  get user() {
    return this._auth?.student;
  }

  get token() {
    return this._auth?.token;
  }

  logout() {
    localStorage.removeItem(authKey);
    this._auth = undefined;
  }

  signup(signupRequest: SignupRequest) {
    return this.http.post<Profile>(`${environment.apiURL}/students/signup`, signupRequest)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Error desconocido';
          if (error.error instanceof ErrorEvent) {
            // Error del lado del cliente
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // Error del lado del servidor
            if (error.error.detail === 'The email address is already in use.')
              errorMessage = 'Correo en uso. Inicia sesión :)'
            else if (error.error.detail === 'The username is already in use.')
              errorMessage = 'Nombre de usuario en uso :('
          }
          console.error(errorMessage);
          return throwError(() => errorMessage);
      })
    );  
  }
}
