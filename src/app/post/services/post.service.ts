import { PostConnectionInfoFragmentDoc, PostConnectionInfoFragmentDocument, GetAllPostsQuery, DeletePostMutation, DeletePostGQL, CreateCommentMutation, CreateCommentGQL, DeleteCommentGQL, DeleteCommentMutation } from './../../graphql/post.graphql';
import { CreatePostInput, CreatePostPayload, DeletePostInput, CreateCommentInput, DeleteCommentInput } from './../../graphql/generated';
import { Injectable } from '@angular/core';
import { CreatePostGQL, CreatePostMutation, GetAllPostsGQL, GetPostByIdGQL, PostConnectionFragment, PostInfoFragment } from 'src/app/graphql/post.graphql';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QueryPostArgs } from 'src/app/graphql/generated';
import { FetchResult } from '@apollo/client/core';
import { ObservableQuery } from '@apollo/client/core/ObservableQuery';
import { QueryRef } from 'apollo-angular';



@Injectable({
  providedIn: 'root'
})
export class PostService {
  

  constructor(private getPostsGQL: GetAllPostsGQL,
    private getPostByIdGQL: GetPostByIdGQL,
    private createPostGQL: CreatePostGQL,
    private deletePostGQL: DeletePostGQL,
    private createCommentGQL: CreateCommentGQL,
    private deleteCommentGQL: DeleteCommentGQL
  ) { }

  public getAllPosts(): any {//Observable<PostConnectionFragment> {

    return this.getPostsGQL.watch();
    
  }

  public getPostById({ id }: QueryPostArgs): Observable<PostInfoFragment> {
    return this.getPostByIdGQL.watch({ id }).valueChanges.pipe(map((res) => res.data.post));
  }

  public createPost({ body, clientMutationId, title, userId }: CreatePostInput): Observable<FetchResult<CreatePostMutation>> {
    
    return this.createPostGQL.mutate(
       {   
        input:{     
          body,
          clientMutationId,
          title,
          userId,
        },       
      },			
    );

  }

  public deletePost({  clientMutationId, id }: DeletePostInput): Observable<FetchResult<DeletePostMutation>> {
    
    return this.deletePostGQL.mutate(
       {   
        input:{     
          clientMutationId,
          id
        },       
      },			
    );

  }

  public createComment({ body, clientMutationId,  email, name,  postId }: CreateCommentInput): Observable<FetchResult<CreateCommentMutation>> {
    
    return this.createCommentGQL.mutate(
       {   
        input:{     
          body, clientMutationId,  email, name,  postId
        },       
      },			
    );

  }

  public deleteComment({  clientMutationId, id }: DeleteCommentInput): Observable<FetchResult<DeleteCommentMutation>> {
    
    return this.deleteCommentGQL.mutate(
       {   
        input:{     
          clientMutationId,
          id
        },       
      },			
    );

  }

}


