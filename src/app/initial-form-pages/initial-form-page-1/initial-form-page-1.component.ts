import { Component } from '@angular/core';

@Component({
  selector: 'app-initial-form-page-1',
  templateUrl: './initial-form-page-1.component.html',
  styleUrl: './initial-form-page-1.component.css'
})
export class InitialFormPage1Component {
  selectedOption: string = '';

  onSelectionChange(event: any) {
    this.selectedOption = event.value;
    localStorage.setItem('selectedOption', this.selectedOption);
  }
}
