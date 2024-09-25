import { Component } from '@angular/core';
import { ApiService } from './services/API';
import { User } from './models/User';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Post } from './models/Post';
import { EMPTY, forkJoin } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CommentPost } from './models/CommentPost';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserPostsComponent } from './user-posts/user-posts.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UserProfileComponent,
    UserPostsComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Taller';
  txtUser: string = ''; // Input del usuario

  user: User | null = null;
  posts: Post[] = [];
  cp: CommentPost[][] = [];
  errorMessage: string = ''; // Mensaje de error

  constructor(private apiService: ApiService) {}

  // Función para buscar el usuario
  searchUser() {
    this.apiService.getUserByUsername(this.txtUser).pipe(
      tap(user => {
        if (user) {
          this.user = user;
          this.fetchPostsAndComments(user.id);
          this.errorMessage = '';
        } else {
          this.errorMessage = 'Usuario no encontrado';
          this.resetData();
        }
      }),
      catchError(() => {
        this.errorMessage = 'Error en la consulta';
        this.resetData();
        return EMPTY;
      })
    ).subscribe();

    console.log('Error: ' + this.errorMessage); // Depuración: muestra el error si ocurre

  }

  fetchPostsAndComments(userId: number) {
    this.apiService.getPostsByUserId(userId).subscribe(
      posts => {
        this.posts = posts.length > 0 ? posts : [];
        this.errorMessage = posts.length === 0 ? 'Sin posts' : '';
        
        const commentsRequests = posts.map(post =>
          this.apiService.getCommentsByPostId(post.id).pipe(
            catchError(() => {
              this.errorMessage = `Sin comentarios para el post ID: ${post.id}`;
              return EMPTY;
            })
          )
        );

        forkJoin(commentsRequests).subscribe(commentsArray => {
          this.cp = commentsArray;
          
          if (this.cp.every(c => c.length === 0)) {
            this.errorMessage = 'Sin comentarios para los posts';
          }
        });
      },
      error => {
        this.errorMessage = 'Error al obtener los posts';
      }
    );
  }

  private resetData() {
    this.user = null;
    this.posts = [];
    this.cp = [];
  }
}
