import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { InscriptionResponse } from '../interfaces/inscription.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  constructor(private http: HttpClient) { }

  getAllInscriptionsByStudent(studentId: number): Observable<InscriptionResponse[]> {
    return this.http.get<InscriptionResponse[]>(`${environment.apiURL}/inscriptions/students/${studentId}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error al obtener inscripciones', error);
          throw error;
        })
      );
  }
}
