import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { RoutesRoutingModule } from './routes-routing.module'
import { RoutesComponent } from './routes.component'
import { RouteComponent } from './components/route/route.component'
import { IconPipe } from './pipes/icon.pipe'
import { ProjectComponent } from './components/project/project.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DialogProjectComponent } from './components/dialog-project/dialog-project.component'
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle
} from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MaterialModule } from '../material/material.module'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'

@NgModule({
  declarations: [
    RoutesComponent,
    RouteComponent,
    IconPipe,
    ProjectComponent,
    DialogProjectComponent
  ],
  imports: [
    CommonModule,
    RoutesRoutingModule,
    FormsModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatCardModule
  ]
})
export class RoutesModule {}
