import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Profile } from '../interfaces/auth.interface';

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
}
