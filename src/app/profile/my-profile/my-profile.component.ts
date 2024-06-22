import { Component, OnInit } from '@angular/core';
import { InscriptionResponse } from '../../inscription/interfaces/inscription.interface';
import { Router } from '@angular/router';
import { InscriptionService } from '../../inscription/services/inscription.service';
import { AuthService } from '../../student/services/auth.service';
import { PostService } from '../../post/services/post.service';
import { PostResponse } from '../../post/interfaces/post.interface';
import { RouteResponse } from '../../routes/interfaces/routes-response';
import { StudentService } from '../../student/services/student.service';
import { Profile } from '../../student/interfaces/auth.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit {
  inscriptions: InscriptionResponse[] = [];
  posts: PostResponse[] = [];
  student?: Profile;

  constructor(
    private router: Router,
    private inscriptionService: InscriptionService,
    private authService: AuthService,
    private postService: PostService,
    private studentService: StudentService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    const student = this.authService.user;
    if (student) {
      this.studentService.getStudentById(student.id).subscribe({
        next: (studentProfile: Profile) => {
          this.student = studentProfile;
          console.log(this.student);
        },
        error: error => {
          console.error(error);
        }
      });

      this.inscriptionService.getAllInscriptionsByStudent(student.id).subscribe({
        next: inscriptions => {
          this.inscriptions = inscriptions;
        },
        error: error => {
          console.error('Error al obtener inscripciones', error);
        }
      });

      this.postService.getAllPostsByStudent(student.id).subscribe({
        next: posts => {
          this.posts = posts;
          console.log(posts);
        },
        error: error => {
          console.error('Error al obtener publicaciones', error);
        }
      });
    }
  }

  selectPost(postId: number) {
    this.router.navigate(['post'], { queryParams: { post: postId } });
  }

  selectRoute(route: RouteResponse) {
    this.router.navigate(['routes', route.id], {
      state: { additionalData: route }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
    this.snackBar.open('Sesión cerrada', 'Cerrar', {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }
}