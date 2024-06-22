import { Component, OnInit } from '@angular/core'
import { RoutesService } from '../../services/routes.service'
import { ActivatedRoute } from '@angular/router'
import {
  ProjectResponse,
  ProgressResponse,
  PostsByProjectResponse,
  ResourceResponse,
  BlogResponse
} from '../../interfaces/routes-response'

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

  constructor (
    private route: ActivatedRoute,
    private routesService: RoutesService
  ) {}

  ngOnInit (): void {
    // Obtiene el ID de la ruta de los parámetros de la URL
    this.route.params.subscribe(params => {
      this.projectId = +params['id'] // El '+' convierte el string a número
    })
    console.log(this.projectId)

    this.projectData = (history.state as any)['additionalData']

    // OBtain student
    const data = localStorage.getItem('codelace_auth')
    const parsedData = JSON.parse(data || '{}')
    const student = parsedData.student.id

    // Get Progress
    this.routesService.getProjectDetails(student, this.projectId).subscribe({
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
        console.log(resources)
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

	formatearFecha(fechaString:string) {
		const fecha = new Date(fechaString);
		const dia = fecha.getDate();
		const mes = fecha.getMonth();
		const anio = fecha.getFullYear();
	
		const meses = [
			'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
			'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
		];
	
		const fechaFormateada = `${dia} ${meses[mes]} ${anio}`;
		return fechaFormateada;
	}
}
