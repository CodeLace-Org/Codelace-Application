import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewportService {

  constructor() {
    this.adjustHeight();
    window.addEventListener('resize', this.adjustHeight);
    window.addEventListener('load', this.adjustHeight);
  }

  adjustHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    const app = document.getElementById('app');
    if (app) {
      app.style.height = `calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))`;
    }
  }
}
