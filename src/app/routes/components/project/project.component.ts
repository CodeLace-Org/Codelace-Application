import { Component, OnInit } from '@angular/core'
import { RoutesService } from '../../services/routes.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  projectId: number = 0
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
  }
}
