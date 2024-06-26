import { Component, OnInit } from '@angular/core'
import { RoutesService } from '../../services/routes.service'
import { ActivatedRoute, Router } from '@angular/router'
import {
  ProjectResponse,
  ProgressResponse,
  PostsByProjectResponse,
  ResourceResponse,
  BlogResponse
} from '../../interfaces/routes-response'
import { MatDialog } from '@angular/material/dialog'
import { DialogProjectComponent } from '../dialog-project/dialog-project.component'
import { AuthService } from '../../../student/services/auth.service'

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  projectId: number = 0
  projectData!: ProjectResponse
  progress!: ProgressResponse[]
  posts!: PostsByProjectResponse[]
  resources!: ResourceResponse[]
  blogs!: BlogResponse[]
  student!: number
  routeId!: number
  constructor (
    private router: Router,
    private route: ActivatedRoute,
    private routesService: RoutesService,
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit (): void {
    // Obtiene el ID de la ruta de los parámetros de la URL
    this.route.params.subscribe(params => {
      this.projectId = +params['id'] // El '+' convierte el string a número
    })

    this.projectData = (history.state as any)['additionalData']
    this.routeId = (history.state as any)['route']
    this.student = this.authService.user?.id ?? 0
    console.log(history.state)
    console.log(this.routeId)
    // Get Progress
    this.routesService
      .getProjectDetails(this.student, this.projectId)
      .subscribe({
        next: projectDetails => {
          this.progress = projectDetails.progress
        },
        error: error => {
          console.error(error)
        }
      })

    // Get Post
    this.routesService.getAllPostsByProject(this.projectId).subscribe({
      next: posts => {
        console.log(posts)
        this.posts = posts
      },
      error: error => {
        console.error(error)
      }
    })

    // Get Resources
    this.routesService.getAllResourcesByProject(this.projectId).subscribe({
      next: resources => {
        console.log('resources', resources)
        this.resources = resources
      },
      error: error => {
        console.error(error)
      }
    })
    // Get Blogs
    this.routesService.getAllBlogsByProject(this.projectId).subscribe({
      next: blogs => {
        console.log(blogs)
        this.blogs = blogs
      },
      error: error => {
        console.error(error)
      }
    })
  }

  formatearFecha (fechaString: string) {
    const fecha = new Date(fechaString)
    const dia = fecha.getDate()
    const mes = fecha.getMonth()
    const anio = fecha.getFullYear()

    const meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ]

    const fechaFormateada = `${dia} ${meses[mes]} ${anio}`
    return fechaFormateada
  }

  openDialog () {
    this.dialog.open(DialogProjectComponent, {
      data: {
        student: this.student,
        route: this.routeId,
        project: this.projectId,
        projectTitle: this.projectData.title
      },
      maxWidth: '100%',
      width: '1600px',
      height: '750px',
      panelClass: 'dialog-background'
    })
  }

  handleRoute (post: PostsByProjectResponse) {
    this.router.navigate(['post/post-information'], {
      queryParams: {
        postId: post.id
      }
    })
  }
}
