import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { IconPipe } from './pipes/icon.pipe';


@NgModule({
  declarations: [
    ProfileComponent,
    MyProfileComponent,
    IconPipe
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
  ]
})
export class ProfileModule { }
