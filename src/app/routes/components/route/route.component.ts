import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { RoutesService } from '../../services/routes.service'
import { InscriptionService } from '../../../inscription/services/inscription.service'
import { AuthService } from '../../../student/services/auth.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import {
  ProjectResponse,
  RouteResponse
} from '../../interfaces/routes-response'

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrl: './route.component.css'
})
export class RouteComponent implements OnInit {
  routeId: number = 0
  routeData!: RouteResponse
  projectData: ProjectResponse[] = []
  isInscribed: boolean = false

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private routesService: RoutesService,
    private inscriptionService: InscriptionService,
    private authService: AuthService,
    private snackBar: MatSnackBar
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

    // obtiene inscripcion
    this.inscriptionService
      .getAllInscriptionsByStudent(this.authService.user?.id!)
      .subscribe({
        next: inscriptions => {
          console.log(inscriptions)
          if (inscriptions.length > 0) {
            this.isInscribed = inscriptions.some(
              inscription => inscription.route.id === this.routeId
            )
          }
        },
        error: error => {
          console.error(error)
        }
      })
  }

  handleProject (project: ProjectResponse) {
    this.router.navigate(['routes/project', project.id], {
      state: { additionalData: project, route: this.routeId }
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
        this.snackBar.open('Inscripción exitosa', 'Cerrar', {
          duration: 3000
        })
        this.isInscribed = true
      },
      error: error => {
        console.error(error)
      }
    })
  }
}
