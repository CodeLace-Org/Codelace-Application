import { Router } from '@angular/router';
import { AuthService } from './../../student/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../../post/services/post.service';
import { PostResponse } from '../../post/interfaces/post.interface';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.css'
})
export class MyProjectsComponent implements OnInit {
  posts: PostResponse[] = [];

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void{
    const student = this.authService.user;
    if(student){
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

  selectPost(post: PostResponse) {
    this.router.navigate(['post/post-information'], { queryParams: { postId: post.id} });
  }
}
