import { Component, Input } from '@angular/core';
import { Post } from '../models/Post';
import { CommonModule } from '@angular/common';
import { CommentPost } from '../models/CommentPost';

@Component({
  selector: 'app-user-posts',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent {
  @Input() posts: Post[] = [];
  @Input() cp: CommentPost[][] = [];

  verComentarios: boolean = false;

  constructor() {}

  ngOnChanges() {
    this.loadComments();
  }

  loadComments() {
    if (this.verComentarios) {
      this.verComentarios = false;
    } else {
      this.verComentarios = true;
    }
  }
}