import { Component, EventEmitter, OnInit } from '@angular/core';
import { PostApiService } from '../post-api.service';
import { catchError, takeUntil } from 'rxjs/operators';
import { of } from 'rxjs';
import { Posts } from '../posts-comments.interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Posts[];

  protected readonly componentDestroyed$: EventEmitter<null> = new EventEmitter<null>();

  constructor(
    private readonly postApi: PostApiService,
  ) { }

  ngOnInit() {
    this.postApi.getPosts()
      .pipe(
        takeUntil(this.componentDestroyed$),
        catchError(() => {
          return of([]);
        }),
      )
      .subscribe((posts: any) => {
        this.posts = posts;
      });
  }
}
