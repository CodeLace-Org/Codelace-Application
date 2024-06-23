import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EditProfileRequest, Profile, EditPasswordRequest } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudentById(id: number): Observable<Profile> {
    return this.http.get<Profile>(`${environment.apiURL}/students/${id}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error al obtener estudiante', error);
          throw error;
        })
      );
  }

  putStudentById(id: number, editProfileRequest: EditProfileRequest): Observable<Profile> {
    return this.http.put<Profile>(`${environment.apiURL}/students/${id}`, editProfileRequest)
      .pipe(
        catchError((error: any) => {
          console.error('Error al actualizar la información del estudiante.', error);
          throw error;
        })
      );
  }

  putPasswordStudentById(id: number, editPasswordRequest: EditPasswordRequest): Observable<Profile> {
    return this.http.put<Profile>(`${environment.apiURL}/students/${id}/password`, editPasswordRequest)
      .pipe(
        catchError((error: any) => {
          console.error('Error al actualizar la contraseña del estudiante.', error);
          throw error;
        })
      );
  }
}
