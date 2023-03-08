import { CreateTodoGQL, CreateTodoMutation, DeleteTodoMutation, DeleteTodoGQL, UpdateTodoMutation, UpdateTodoGQL } from './../../graphql/todo.graphql';
import { Injectable } from '@angular/core';
import { GetAllTodosGQL, TodoConnectionFragment } from 'src/app/graphql/todo.graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateTodoInput, DeleteTodoInput, UpdateTodoInput } from 'src/app/graphql/generated';
import { FetchResult } from '@apollo/client/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private getTodosGQL: GetAllTodosGQL,
              private createTodoGQL: CreateTodoGQL,
              private updateTodoGQL: UpdateTodoGQL,
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
          clientMutationId:"abc987", dueOn:"2020-09-23T18:35:21.154355Z", status:"pending", title:"Title Test", userId:864951
        },
      },
    );

  }
  public updateTodo( inp : UpdateTodoInput): Observable<FetchResult<UpdateTodoMutation>> {
    
    return this.updateTodoGQL.mutate(
      {
        input: {
          clientMutationId: inp.clientMutationId,
          id: inp.id,
          dueOn: inp.dueOn,
          title: inp.title,
          status: inp.status
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
