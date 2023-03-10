import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { CreateTodoInput } from 'src/app/graphql/generated';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.page.html',
  styleUrls: ['./todo-create.page.scss'],
})
export class TodoCreatePage implements OnInit {

  constructor(private todoService: TodoService,
              private router: Router ) { }

  ngOnInit() {
  }

  createTodo($event: any){
    $event.userId = Number(localStorage.getItem("user_id"));
    $event.clientMutationId = "abc1";
    
    
     this.todoService.createTodo( $event ).subscribe(
      data => {
        
        this.router.navigate(['/todo'])
          .then(() => {
            window.location.reload();
          });
      }
     )
  }

}
