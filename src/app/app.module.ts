import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './components/home/home.component'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { MaterialModule } from './material/material.module'
import { NavbarComponent } from './shared/navbar/navbar.component'
import { ContentComponent } from './shared/content/content.component'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AuthInterceptor } from './student/interceptor/auth.interceptor'
import { FormsModule } from '@angular/forms'
import { InitialFormPagesModule } from './initial-form-pages/initial-form-pages.module'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    InitialFormPagesModule
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
