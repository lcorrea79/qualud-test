import { Todo } from './../../../graphql/generated';
import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.page.html',
  styleUrls: ['./todo-list.page.scss'],
})
export class TodoListPage implements OnInit {

  todos$! : Todo[] | undefined;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getAllTodos().subscribe(
      data => {
        this.todos$ = data.nodes;
        console.log(data);
      }
    );
  }

  createTodo(){
    this.todoService.createTodo({clientMutationId:"abc987",dueOn:null,
                                status: "pending",title: "Tarea # 1", userId:845634 }).subscribe(
                                  data => {
                                    console.log("Todo: ", data);
                                  }
                                )
  }

}
