import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public active: boolean = false;

  onClick() {
    this.active = !this.active;
  }

  ngOnInit() {}

}
