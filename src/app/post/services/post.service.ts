import { CreatePostInput } from './../../graphql/generated';
import { Injectable } from '@angular/core';
import { CreatePostGQL, CreatePostMutation, GetAllPostsGQL, GetAllPostsQuery, GetPostByIdGQL, PostConnectionFragment, PostInfoFragment } from 'src/app/graphql/post.graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QueryPostArgs } from 'src/app/graphql/generated';
import { FetchResult } from '@apollo/client/core';
import { DataProxy } from '@apollo/client/cache';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private getUsersGQL: GetAllPostsGQL,
    private getPostByIdGQL: GetPostByIdGQL,
    private createPostGQL: CreatePostGQL
  ) { }

  public getAllPosts(): Observable<PostConnectionFragment> {
    return this.getUsersGQL.watch().valueChanges.pipe(map((res) => res.data.posts));
  }

  public getPostById({ id }: QueryPostArgs): Observable<PostInfoFragment> {
    return this.getPostByIdGQL.watch({ id }).valueChanges.pipe(map((res) => res.data.post));
  }

  public createPost({ body, clientMutationId, title, userId }: CreatePostInput): Observable<FetchResult<CreatePostMutation>> {
    
    return this.createPostGQL.mutate(
      {
        input: {
          body,
          clientMutationId,
          title,
          userId,
        },
      },
    );

  }

}


