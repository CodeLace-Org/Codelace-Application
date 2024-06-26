import { FormPage2Service } from './../services/form-page-2.service';
import { Component, OnInit } from '@angular/core';
import { Observer, catchError, of } from 'rxjs';
import { RouteResponse } from '../../routes/interfaces/routes-response';
import {ChangeDetectionStrategy} from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';




@Component({
  selector: 'app-initial-form-page-2',
  templateUrl: './initial-form-page-2.component.html',
  styleUrls: ['./initial-form-page-2.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class InitialFormPage2Component implements OnInit{
  routeData: RouteResponse | undefined;

  constructor(private formpage2service: FormPage2Service, private cdr: ChangeDetectorRef) {}

  

  ngOnInit(): void {
    const selectedOption = localStorage.getItem('selectedOption');
    console.log('Valor recuperado de localStorage:', selectedOption);

    if (selectedOption) {
      this.getRouteById(Number(selectedOption));
    } else {
      console.warn('No se encontró ninguna opción seleccionada en localStorage');
    }
  }

  getRouteById(id: number) {
    this.formpage2service.getRouteById(id).pipe(
      catchError(error => {
        console.error('Error al obtener la ruta desde el backend:', error);
        alert('Error al conectarse con el backend. Por favor, intente nuevamente más tarde.');
        return of(undefined);
      })
    ).subscribe({
      next: (data) => {
        if (data) {
          this.routeData = data;
          console.log('Datos de la ruta:', this.routeData);
          this.cdr.detectChanges(); // Forzar la detección de cambios aquí
        } else {
          console.warn('No se encontraron datos para la ruta con ID:', id);
        }
      },
      error: (error) => {
        console.error('Error al suscribirse al observable:', error);
      },
      complete: () => {
        console.log('Operación completada.');
      }
    });
  }
}
