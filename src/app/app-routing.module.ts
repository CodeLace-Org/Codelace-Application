import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './components/home/home.component'

// Muchachones aqui se agregan la rutas
const routes: Routes = [
  { path: '', loadChildren: () => import('./student/student.module').then(m => m.StudentModule) },
  { path: 'home', component: HomeComponent },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
  { path: 'routes', loadChildren: () => import('./routes/routes.module').then(m => m.RoutesModule) },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
