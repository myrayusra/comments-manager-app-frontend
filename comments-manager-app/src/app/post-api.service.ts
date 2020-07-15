import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Comments, Posts } from './posts-comments.interface';

@Injectable({providedIn: 'root'})
export class PostApiService {
  constructor(
    private http: HttpClient,
  ) {
  }
  public getPosts(): Observable<Posts[]> {
    const url = `${environment.devApi}/posts`;
    return this.http.get<any>(url);
  }

  public getPost(postId: string): Observable<Posts> {
    const url = `${environment.devApi}/posts/${postId}`;
    return this.http.get<any>(url);
  }

  public getComments(postId: string): Observable<Comments[]> {
    const url = `${environment.devApi}/comments?postId=${postId}`;
    return this.http.get<any>(url);
  }
}
