import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './components/home/home.component'
import { AuthGuard } from './student/helpers/auth.guard'

// Muchachones aqui se agregan la rutas
const routes: Routes = [
  { path: '', loadChildren: () => import('./student/student.module').then(m => m.StudentModule) },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard] },
  { path: 'routes', loadChildren: () => import('./routes/routes.module').then(m => m.RoutesModule), canActivate: [AuthGuard] },
  { path: 'inscription', loadChildren: () => import('./inscription/inscription.module').then(m => m.InscriptionModule), canActivate: [AuthGuard] },
  { path: 'post', loadChildren: () => import('./post/post.module').then(m => m.PostModule), canActivate: [AuthGuard] },
  { path: 'initial-form-pages', loadChildren: () => import('./initial-form-pages/initial-form-pages.module').then(m => m.InitialFormPagesModule) },
  { path: 'project', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule), canActivate: [AuthGuard] }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
