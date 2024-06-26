import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialFormPagesComponent } from './initial-form-pages.component';
import { InitialFormPage1Component } from './initial-form-page-1/initial-form-page-1.component';
import { InitialFormPage2Component } from './initial-form-page-2/initial-form-page-2.component';

const routes: Routes = [
  { path: '', component: InitialFormPagesComponent },
  { path: 'initial-form-page-1', component: InitialFormPage1Component },
  { path: 'initial-form-page-2', component: InitialFormPage2Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InitialFormPagesRoutingModule { }
