import { Component, OnInit } from '@angular/core';
import { InscriptionResponse } from '../../inscription/interfaces/inscription.interface';
import { Router } from '@angular/router';
import { InscriptionService } from '../../inscription/services/inscription.service';
import { AuthService } from '../../student/services/auth.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit{
  inscriptions: InscriptionResponse[] = [];

  constructor(
    private router: Router,
    private inscriptionService: InscriptionService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
      const student = this.authService.user;
      if (student) {
        this.inscriptionService.getAllInscriptionsByStudent(student.id).subscribe({
          next: inscriptions => {
            this.inscriptions = inscriptions;
          },
          error: error => {
            console.error('Error al obtener inscripciones', error);
          }
        });
      }
  }
}
