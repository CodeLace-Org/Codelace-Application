import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import { RoutesResponse } from '../interfaces/routes-response'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  private http = inject(HttpClient)

  getAllRoutes (): Observable<RoutesResponse[]> {
    return this.http.get<RoutesResponse[]>(`${environment.apiURL}/routes`, {})
  }
}
