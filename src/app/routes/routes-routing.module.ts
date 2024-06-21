import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RoutesComponent } from './routes.component'
import { RouteComponent } from './components/route/route.component'
import { ProjectComponent } from './components/project/project.component'

const routes: Routes = [
  { path: '', component: RoutesComponent },
  { path: ':id', component: RouteComponent },
  { path: 'project/:id', component: ProjectComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule {}
