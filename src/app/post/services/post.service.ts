import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { CommentResponse, PostResponse, PostResponseId, RocketResponse } from '../interfaces/post.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPostsByStudent(studentId: number): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(`${environment.apiURL}/posts/students/${studentId}`)
      .pipe(
        map(posts => posts.map(post => {
          return {
            ...post,
            date: new Date(post.date).toLocaleDateString('es-ES')
          };
        })),
      );
  }

  getAllCommentsByPostId(postId: number): Observable<CommentResponse[]> {
    return this.http
      .get<CommentResponse[]>(`${environment.apiURL}/comments/post/${postId}`)
      .pipe(
        map(comments => comments.map(comment => {
          return {
            ...comment,
            date: new Date(comment.date).toLocaleDateString('es-ES')
          };
        })),
      );
  }

  getPostById(postId: number): Observable<PostResponseId> {
    return this.http
      .get<PostResponseId>(
        `${environment.apiURL}/posts/${postId}`
      )
      .pipe(
        map(post => {
          return post
        })
      )
  }

  // Method that verify if the student has a rocket
  verifyRocket(postId: number, studentId: number): Observable<RocketResponse[]> {
    return this.http
      .get<RocketResponse[]>(`${environment.apiURL}/rockets/posts/${postId}/students/${studentId}`)
      .pipe(
        map(response => {
          return response
        })
      )
  }

  // Method that creates a rocket
  createRocket(postId: number, studentId: number): Observable<RocketResponse> {
    return this.http
      .post<RocketResponse>(`${environment.apiURL}/rockets`, {
        student: studentId,
        post: postId
      })
      .pipe(
        map(response => {
          return response
        })
      )
  }

  deleteRocket(postId: number, studentId: number): Observable<RocketResponse> {
    return this.http
      .delete<RocketResponse>(`${environment.apiURL}/rockets/posts/${postId}/students/${studentId}`)
      .pipe(
        map(response => {
          return response
        })
      )
  }

  // Method that creates a comment
  createComment(postId: number, studentId: number, content: string): Observable<CommentResponse> {
    return this.http
      .post<CommentResponse>(`${environment.apiURL}/comments`, {
        student: studentId,
        post: postId,
        content: content
      })
      .pipe(
        map(response => {
          return response
        })
      )
  }
}
