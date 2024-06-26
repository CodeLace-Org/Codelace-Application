import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';
import { CommentResponse, PostResponseId } from '../interfaces/post.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../student/services/auth.service';
import { Profile } from '../../student/interfaces/auth.interface';

@Component({
  selector: 'app-post-information',
  templateUrl: './post-information.component.html',
  styleUrl: './post-information.component.css'
})
export class PostInformationComponent implements OnInit {
  // projectId: number = 0
  postId: number = 0;
  post!: PostResponseId;
  comments!: CommentResponse[];
  hasRocket: boolean = false;
  svgColor: string = '#A5ABB7';
  studentId: number = 0;

  private readonly formBuilder = inject(FormBuilder);
  formGroup = this.formBuilder.group({
    content: ['', [Validators.required, Validators.minLength(1)]]
  })


  constructor(
    private route: ActivatedRoute,
    private postsService: PostService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    const student = this.authService.user;
    // Obtiene el Id del estudiante y del proyecto
    this.route.queryParams.subscribe(params => {
      this.postId = +params['postId'];
    })

    if(student) {
      this.studentId = student.id;
      // Get getPostById
      this.getPost(this.postId);

      // Get getAllCommentsByPostId
      this.postsService.getAllCommentsByPostId(this.postId).subscribe({
        next: comments => {
          this.comments = comments
          console.log(comments)
        },
        error: error => {
          console.error(error);
        }
      })

      // Get verifyRocket
      this.postsService.verifyRocket(this.postId, this.studentId).subscribe({
        next: rocket => {
          if (rocket.length != 0) {
            this.hasRocket = true;
            this.svgColor = '#C6AFFF';
          }
          else {
            this.hasRocket = false;
            this.svgColor = '#A5ABB7';
          }
          console.log(rocket)
        },
        error: error => {
          if (error.status === 404) {
            // Manejo específico para el error 404 - Rocket not found.
            this.hasRocket = false;
            console.log("Rocket not found.");
          } else {
            // Manejo general de otros errores
            console.error(error);
          }
        }
      })
    }
  }

  formatearFecha(fechaString: string) {
    const fecha = new Date(fechaString)
    const dia = fecha.getDate()
    const mes = fecha.getMonth()
    const anio = fecha.getFullYear()

    const meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ]

    const fechaFormateada = `${dia} ${meses[mes]} ${anio}`
    return fechaFormateada
  }

  // Get createComment
  submit() {
    if(this.formGroup.valid){
      const contentValue = this.formGroup.controls.content.value ?? '';
      this.postsService.createComment(this.postId, this.studentId, contentValue).subscribe({
        next: comment => {
          this.comments.push(comment)
          this.getPost(this.postId);
          console.log(comment)
        },
        error: error => {
          console.error(error);
        }
      })
    }
    
  }

  getPost(id: number){
    this.postsService.getPostById(id).subscribe({
      next: post => {
        this.post = post
        console.log(post)
      },
      error: error => {
        console.error(error);
      }
    })
  }

  redirectToUrl(url: string): void {
    // Asegúrate de que la URL es absoluta
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'http://' + url;
    }
    window.location.href = url;
  }
  // Function to toggle button rocket
  handleRocket() {
    if (this.hasRocket) {
      this.postsService.deleteRocket(this.postId, this.studentId).subscribe({
        next: rocket => {
          this.hasRocket = false;
          this.post.rockets--;
          console.log(rocket)
        },
        error: error => {
          console.error(error);
        }
      })
    }
    else {
      this.postsService.createRocket(this.postId, this.studentId).subscribe({
        next: rocket => {
          this.hasRocket = true;
          this.post.rockets++;
          console.log(rocket)
        },
        error: error => {
          console.error(error);
        }
      })
    }
    // Handle the color change
    this.svgColor = this.hasRocket ? '#A5ABB7' : '#C6AFFF';
  }
}
