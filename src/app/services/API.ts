import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClientModule
import { User } from '../models/User';
import { map, Observable } from 'rxjs';
import { Post } from '../models/Post';
import { CommentPost } from '../models/CommentPost';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = "https://dummyjson.com";

  constructor(
    private http: HttpClient
  ) { }

  // Cambia para devolver un Observable
  getUserByUsername(txtUser: string): Observable<User | null> {
    return this.http.get<any>(`${this.baseUrl}/users/filter?key=username&value=${txtUser}`)
      .pipe(
        map(response => {
          if (response.users && response.users.length > 0) {
            return response.users[0]; // Devuelve el primer usuario
          }
          return null;
        })
      );
  }

  getPostsByUserId(userId: number): Observable<Post[]> {
    return this.http.get<any>(`${this.baseUrl}/posts/user/${userId}`)
      .pipe(
        map(response => {
          if (response.posts && response.posts.length > 0) {
            return response.posts; // Devuelve los posts si existen
          }
          return []; // Retorna un array vacío si no hay posts
        })
      );
  }

  // Este método debe devolver un array de CommentPost[]
  getCommentsByPostId(postId: number): Observable<CommentPost[]> {
  
    return this.http.get<any>(`${this.baseUrl}/comments/post/${postId}`)
      .pipe(
        map(response => {
          if (response.comments && response.comments.length > 0) {
            return response.comments; // Devuelve los comentarios si existen
          }
          return []; // Retorna un array vacío si no hay comentarios
        })
      );
  }
}