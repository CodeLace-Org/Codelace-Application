import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post.component';
import { PostInformationComponent } from './post-information/post-information.component';

const routes: Routes = [
  { path: '', component: PostComponent },
  { path: 'post-information', component: PostInformationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
