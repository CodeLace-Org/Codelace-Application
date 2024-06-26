import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { InitialFormPagesRoutingModule } from './initial-form-pages-routing.module';
import { InitialFormPagesComponent } from './initial-form-pages.component';
import { InitialFormPage1Component } from './initial-form-page-1/initial-form-page-1.component';
import { InitialFormPage2Component } from './initial-form-page-2/initial-form-page-2.component';
import { MaterialModule } from '../material/material.module';
import { IconPipe } from './pipes/icon.pipe';


@NgModule({
  declarations: [
    InitialFormPagesComponent,
    InitialFormPage1Component,
    InitialFormPage2Component,
    IconPipe
  ],
  imports: [
    CommonModule,
    InitialFormPagesRoutingModule,
    MaterialModule,
    
  ]
})
export class InitialFormPagesModule { }
