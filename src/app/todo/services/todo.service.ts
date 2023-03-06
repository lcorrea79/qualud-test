import { Injectable } from '@angular/core';
import { GetAllTodosGQL, TodoConnectionFragment } from 'src/app/graphql/todo.graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private getTodosGQL: GetAllTodosGQL
  ) { }

  public getAllTodos(): Observable<TodoConnectionFragment> {
    return this.getTodosGQL.watch().valueChanges.pipe(map((res) => res.data.todos));
  }

  /*public getPostById({ id }: QueryPostArgs): Observable<PostInfoFragment> {
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

  }*/
}
