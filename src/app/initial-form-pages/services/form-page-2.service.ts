import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RouteResponse } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class FormPage2Service {

  constructor(private http: HttpClient) { }
  
  getRouteById(id: number): Observable<RouteResponse> {
    return this.http.get<RouteResponse>(`${environment.apiURL}/routes/${id}`)
      .pipe(
        catchError((error: RouteResponse) => {
          console.error('Error al obtener la ruta', error);
          throw error;
        })
      );
  }
}
