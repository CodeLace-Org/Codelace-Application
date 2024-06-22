import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { PostResponse } from '../interfaces/post.interface';
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
}
