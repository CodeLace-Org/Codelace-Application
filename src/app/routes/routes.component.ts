import { Component, OnInit } from '@angular/core'
import { RoutesService } from './services/routes.service'
import { RouteResponse } from './interfaces/routes-response'
import { Router } from '@angular/router'

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrl: './routes.component.css'
})
export class RoutesComponent implements OnInit {
  routesData: RouteResponse[] = []
  constructor (private routesService: RoutesService, private router: Router) {}

  ngOnInit () {
    this.routesService.getAllRoutes().subscribe({
      next: routes => {
        console.log(routes)
        this.routesData = routes
      },
      error: error => {
        console.error(error)
      }
    })
  }

  handleRoute (route: RouteResponse) {
    // Redirige a la ruta deseada con el ID de la ruta
    this.router.navigate(['routes', route.id], {
      state: { additionalData: route }
    })
  }
}
