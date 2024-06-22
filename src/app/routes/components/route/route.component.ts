import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { RoutesService } from '../../services/routes.service'
import {
  ProjectResponse,
  RouteResponse
} from '../../interfaces/routes-response'
import { Location } from '@angular/common'

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrl: './route.component.css'
})
export class RouteComponent implements OnInit {
  routeId: number = 0
  routeData!: RouteResponse

  projectData: ProjectResponse[] = []
  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private routesService: RoutesService,
    private location: Location
  ) {}

  ngOnInit (): void {
    // Obtiene el ID de la ruta de los parámetros de la URL
    this.route.params.subscribe(params => {
      this.routeId = +params['id'] // El '+' convierte el string a número
    })

    // Obtiene el estado adicional del router
    this.routeData = (history.state as any)['additionalData']

    // Obtiene los proyectos de la ruta
    this.routesService.getAllProjectsByRoute(this.routeId).subscribe({
      next: projects => {
        // console.log(projects)
        this.projectData = projects
      },
      error: error => {
        console.error(error)
      }
    })
  }

  handleProject (project: ProjectResponse) {
    this.router.navigate(['routes/project', project.id], {
      state: { additionalData: project }
    })
  }

  handleInscription (route: number) {
    // Obtenemos el usuario del sesion storage
    const data = localStorage.getItem('codelace_auth')
    const parsedData = JSON.parse(data || '{}')
    const student = parsedData.student.id

    this.routesService.createInscription(student, route).subscribe({
      next: inscription => {
        console.log(inscription)
      },
      error: error => {
        console.error(error)
      }
    })
  }
}
