import { Todo, UpdateTodoInput } from './../../../graphql/generated';
import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {

  todos!: any;
  todosRef$!: any;
  hasMoreToLoad: boolean = false;
  cursor: string | undefined= "";

  user_id: number = 0;

  constructor(private todoService: TodoService) {
    this.user_id = Number(localStorage.getItem("user_id"));
   }

  ngOnInit() {
    this.loadData();
 
   }
 
 
   loadData() {
     this.todosRef$ = this.todoService.getAllTodos();
 
     this.todos = this.todosRef$.valueChanges.pipe(
       map((result:any) => {           
      
         this.hasMoreToLoad = result.data.todos.pageInfo.hasNextPage;
         this.cursor = result.data.todos.pageInfo.endCursor;
         
         return result.data.todos.nodes;
       })
     );
 
 
   }
 
   
 
   loadMore() {
 
     this.todosRef$.fetchMore({
       variables: { first: 20,
         after: this.cursor},      
       updateQuery: (previousResult: any, { fetchMoreResult } : {fetchMoreResult : any}) => {        
         //if (!fetchMoreResult) return previousResult
         
         const newNodes = fetchMoreResult.todos.nodes;
         const newEdges = fetchMoreResult.todos.edges;
         const pageInfo = fetchMoreResult.todos.pageInfo;
         
         this.hasMoreToLoad = fetchMoreResult.todos.pageInfo.hasNextPage;
        
         
         return { 
           ...previousResult,
           todos: {
           edges:  [...previousResult.todos.edges, ...newEdges],
           totalCount: previousResult.todos.totalCount,
           nodes: [...previousResult.todos.nodes, ...newNodes],
           pageInfo: pageInfo,
           __typename: 'todoConnection'                 
         } 
         }
       }
     });
 
   } 
   
   onIonInfinite(ev: any) {
     this.loadMore();
     setTimeout(() => {
       (ev as InfiniteScrollCustomEvent).target.complete();
     }, 500);
   }

  

  deleteTodo($event: number){
    
    this.todoService.deleteTodo({ clientMutationId: "acv", id: $event}).subscribe(
      data => {
        this.todos.subscribe(
          (p:any) => {           
            this.todos = Observable.create((observer:any) => {observer.next(p.filter((f:any) => f.id != $event ))})
          }
        );
         
      }
    );
  }

  updateTodo($event: UpdateTodoInput, index: number){
    $event.clientMutationId = "xyz58";
   
    this.todoService.updateTodo($event).subscribe(
      data => {
        this.todos.subscribe(
          (p:any) => {            
             
            let index = p.findIndex((f:any) => {f.id == $event.id})
            p.splice(index,1,$event);
  
             
              this.todos = Observable.create((observer:any) => {observer.next(p)});

          }
        );
       
      }
    );
  }

}
