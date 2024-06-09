import { Component } from '@angular/core'
import { ViewportService } from './services/viewport/viewport.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'codelace-app'

  constructor(private viewportService: ViewportService) {}

  ngOnInit(): void {
    this.viewportService.adjustHeight();
  }
}
