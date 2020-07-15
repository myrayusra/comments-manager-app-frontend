import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostsComponent} from './posts/posts.component';
import {CommentsComponent} from './comments/comments.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'posts',
  },
  {
    path: 'posts',
    component: PostsComponent,
  },
  {
    path: 'post/:postId',
    component: CommentsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
