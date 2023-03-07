import { CreateTodoGQL, CreateTodoMutation, DeleteTodoMutation, DeleteTodoGQL } from './../../graphql/todo.graphql';
import { Injectable } from '@angular/core';
import { GetAllTodosGQL, TodoConnectionFragment } from 'src/app/graphql/todo.graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateTodoInput, DeleteTodoInput } from 'src/app/graphql/generated';
import { FetchResult } from '@apollo/client/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private getTodosGQL: GetAllTodosGQL,
              private createTodoGQL: CreateTodoGQL,
              private deleteTodoGQL: DeleteTodoGQL
  ) { }

  public getAllTodos(): Observable<TodoConnectionFragment> {
    return this.getTodosGQL.watch().valueChanges.pipe(map((res) => res.data.todos));
  }

  /*public getPostById({ id }: QueryPostArgs): Observable<PostInfoFragment> {
    return this.getPostByIdGQL.watch({ id }).valueChanges.pipe(map((res) => res.data.post));
  }
*/
  public createTodo({ clientMutationId, dueOn, status, title, userId  }: CreateTodoInput): Observable<FetchResult<CreateTodoMutation>> {
    
    return this.createTodoGQL.mutate(
      {
        input: {
          clientMutationId, dueOn, status, title, userId
        },
      },
    );

  }

  public deleteTodo({ clientMutationId, id  }: DeleteTodoInput): Observable<FetchResult<DeleteTodoMutation>> {
    
    return this.deleteTodoGQL.mutate(
      {
        input: {
          clientMutationId, id
        },
      },
    );

  }
}
