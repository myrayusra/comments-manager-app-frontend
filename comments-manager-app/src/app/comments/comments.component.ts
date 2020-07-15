import { Component, EventEmitter, OnInit} from '@angular/core';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { of } from 'rxjs';
import { PostApiService } from '../post-api.service';
import { Comments, Posts } from '../posts-comments.interface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  post: Posts[];
  comments: Comments[];
  searchComment: any;
  filteredComments: any;

  protected readonly componentDestroyed$: EventEmitter<null> = new EventEmitter<null>();

  constructor(
    private readonly postApi: PostApiService,
    public readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        takeUntil(this.componentDestroyed$),
        switchMap((paramMap: Params) => this.postApi.getPost(paramMap.get('postId'))),
        catchError(() => {
          return of([]);
        })
      )
      .subscribe((post: any) => (this.post = post));
  }

  getComments(postId: string) {
    this.searchComment = null;
    this.postApi.getComments(postId)
      .pipe(
        takeUntil(this.componentDestroyed$),
        catchError(() => {
          return of ([]);
        }),
      )
      .subscribe((comments: any) => (this.comments = comments));
  }

  searchComments() {
    const filteredComments: any = [];

    if (this.searchComment) {
      for (const selectedComment of this.comments) {
        if (selectedComment.name.toLowerCase().search(this.searchComment.toLowerCase()) !== -1 ||
          selectedComment.email.toLowerCase().search(this.searchComment.toLowerCase()) !== -1 ||
          selectedComment.body.toLowerCase().search(this.searchComment.toLowerCase()) !== -1) {
          filteredComments.push(selectedComment);
        }
      }
      this.filteredComments = filteredComments;
    }
  }
}
