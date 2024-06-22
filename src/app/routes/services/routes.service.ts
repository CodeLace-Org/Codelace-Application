import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable, map } from 'rxjs'
import {
  BlogResponse,
  InscriptionResponse,
  PostsByProjectResponse,
  ProjectDetailsResponse,
  ProjectResponse,
  ResourceResponse,
  RouteResponse
} from '../interfaces/routes-response'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  private http = inject(HttpClient)

  // PAGE ROUTES
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

  // PAGE ROUTE
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

  createInscription (
    student: number,
    route: number
  ): Observable<InscriptionResponse> {
    return this.http
      .post<InscriptionResponse>(`${environment.apiURL}/inscriptions`, {
        student,
        route
      })
      .pipe(
        map(response => {
          return response
        })
      )
  }

  // PAGE PROJECT
  getProjectDetails (
    student: number,
    project: number
  ): Observable<ProjectDetailsResponse> {
    return this.http
      .get<ProjectDetailsResponse>(
        `${environment.apiURL}/students/${student}/projects/${project}/details`
      )
      .pipe(
        map(response => {
          return response
        })
      )
  }

  getAllPostsByProject (project: number): Observable<PostsByProjectResponse[]> {
    return this.http
      .get<PostsByProjectResponse[]>(
        `${environment.apiURL}/projects/${project}/posts`
      )
      .pipe(
        map(response => {
          return response
        })
      )
  }

  getAllResourcesByProject (project: number): Observable<ResourceResponse[]> {
    return this.http
      .get<ResourceResponse[]>(
        `${environment.apiURL}/resources/project/${project}`
      )
      .pipe(
        map(response => {
          return response
        })
      )
  }

  getAllBlogsByProject (project: number): Observable<BlogResponse[]> {
    return this.http
      .get<BlogResponse[]>(`${environment.apiURL}/blogs/projects/${project}`)
      .pipe(
        map(response => {
          return response
        })
      )
  }

  // UTILS
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
