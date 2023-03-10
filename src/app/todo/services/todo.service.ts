import { environment } from './../../../environments/environment.prod';
import { CreateTodoGQL, CreateTodoMutation, DeleteTodoMutation, DeleteTodoGQL, UpdateTodoMutation, UpdateTodoGQL } from './../../graphql/todo.graphql';
import { Injectable } from '@angular/core';
import { GetAllTodosGQL, TodoConnectionFragment } from 'src/app/graphql/todo.graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateTodoInput, DeleteTodoInput, UpdateTodoInput } from 'src/app/graphql/generated';
import { FetchResult } from '@apollo/client/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private API_REST: string = "https://gorest.co.in/public/v2";

  httpOptions = {
    headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Accept': 'application/json',
       'Authorization': 'Bearer ' + environment.access_token
     })
   }

  constructor(private getTodosGQL: GetAllTodosGQL,
              private createTodoGQL: CreateTodoGQL,
              private updateTodoGQL: UpdateTodoGQL,
              private deleteTodoGQL: DeleteTodoGQL,
              private http: HttpClient
  ) { }

  public getAllTodos(): any {
    return this.getTodosGQL.watch();
  }

  /*public getPostById({ id }: QueryPostArgs): Observable<PostInfoFragment> {
    return this.getPostByIdGQL.watch({ id }).valueChanges.pipe(map((res) => res.data.post));
  }
*/

/** API REST */
//public createTodo( input: CreateTodoInput): Observable<FetchResult<CreateTodoMutation>> {
  public createTodo( input: {clientMutationId:string, id:number, due_on: string, dueOn: string,title: string, status:string, userId:number}): Observable<FetchResult<CreateTodoMutation>> {
   input.due_on = input.dueOn;
  return this.http.post(this.API_REST + "/users/" + input.userId + "/todos",JSON.stringify(input), this.httpOptions);

}
/** GraphQL */
  /*public createTodo({ clientMutationId, dueOn, status, title, userId  }: CreateTodoInput): Observable<FetchResult<CreateTodoMutation>> {
    
    return this.createTodoGQL.mutate(
      {
        input: {
          clientMutationId:"abc987", dueOn:"2020-09-23T18:35:21.154355Z", status:"pending", title:"Title Test", userId:864951
        },
      },
    );

  }*/

  //API REST
  public updateTodo( input : UpdateTodoInput) {
    
    return this.http.put(this.API_REST + "/todos/" + input.id,JSON.stringify(input), this.httpOptions);

  }
 
  /** GraphQL */
  /*public updateTodo( inp : UpdateTodoInput): Observable<FetchResult<UpdateTodoMutation>> {
    
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

  }*/

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
