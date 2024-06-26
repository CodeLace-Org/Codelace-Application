import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatSidenavModule } from '@angular/material/sidenav'
import {MatRadioModule} from '@angular/material/radio'
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatRadioModule,
    MatCardModule
  ],
  exports: [
    MatSidenavModule,
    MatRadioModule,
    MatCardModule
  ]
})
export class MaterialModule {}
