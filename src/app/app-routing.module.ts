import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './components/home/home.component'

// Muchachones aqui se agregan la rutas
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
  { path: '', loadChildren: () => import('./student/student.module').then(m => m.StudentModule) },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
