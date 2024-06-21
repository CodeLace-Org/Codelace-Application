import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable, map } from 'rxjs'
import { ProjectResponse, RouteResponse } from '../interfaces/routes-response'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  private http = inject(HttpClient)

  getAllRoutes (): Observable<RouteResponse[]> {
    return this.http.get<RouteResponse[]>(`${environment.apiURL}/routes`).pipe(
      map(response => {
        // Limpia los SVGs en la respuesta
        response.forEach(route => {
          if (route.icon) {
            route.icon = this.cleanSVG(route.icon)
          }
        })
        return response
      })
    )
  }

  getAllProjectsByRoute (routeId: number): Observable<ProjectResponse[]> {
    return this.http
      .get<ProjectResponse[]>(
        `${environment.apiURL}/routes/${routeId}/projects`
      )
      .pipe(
        map(response => {
          return response
        })
      )
  }

  cleanSVG (svgString: string): string {
    // Elimina la declaración XML y los comentarios
    svgString = svgString.replace(/<\?xml.*?\?>|<!--.*?-->/g, '').trim()
    // Reemplaza width y height con 80px
    svgString = svgString.replace(/(width|height)="[^"]*"/g, '$1="80px"')

    // Si width o height no existen, añádelos
    if (!svgString.includes('width="80px"')) {
      svgString = svgString.replace('<svg', '<svg width="80px"')
    }
    if (!svgString.includes('height="80px"')) {
      svgString = svgString.replace('<svg', '<svg height="80px"')
    }

    // Reemplaza stroke-width con 1px
    svgString = svgString.replace(/stroke-width="[^"]*"/g, 'stroke-width="1px"')

    // Si stroke-width no existe, añádelo
    if (!svgString.includes('stroke-width="1px"')) {
      svgString = svgString.replace('<svg', '<svg stroke-width="1px"')
    }

    return svgString
  }
}
