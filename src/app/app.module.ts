import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './components/home/home.component'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { MaterialModule } from './material/material.module'
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ContentComponent } from './shared/content/content.component'

@NgModule({
  declarations: [AppComponent, HomeComponent, NavbarComponent, ContentComponent],
  imports: [BrowserModule, AppRoutingModule, MaterialModule],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule {}
