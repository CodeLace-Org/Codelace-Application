import { HttpClient } from '@angular/common/http';
import { AuthRequest, AuthResponse, Profile, SignupRequest } from './../interfaces/auth.interface';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
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
    return this.http.post<Profile>(`${environment.apiURL}/students/signup`, signupRequest);
  }
}
