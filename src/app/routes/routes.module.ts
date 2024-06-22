import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesRoutingModule } from './routes-routing.module';
import { RoutesComponent } from './routes.component';
import { RouteComponent } from './components/route/route.component';
import { IconPipe } from './pipes/icon.pipe';
import { ProjectComponent } from './components/project/project.component';


@NgModule({
  declarations: [
    RoutesComponent,
    RouteComponent,
    IconPipe,
    ProjectComponent
  ],
  imports: [
    CommonModule,
    RoutesRoutingModule
  ],
  exports: [
    IconPipe,
  ]
})
export class RoutesModule { }