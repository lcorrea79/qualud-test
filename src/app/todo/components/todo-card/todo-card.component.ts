import { Component, Input, OnInit } from '@angular/core';
import { Todo } from 'src/app/graphql/generated';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
})
export class TodoCardComponent  implements OnInit {
 
  @Input() todoInfo!: Todo;
  constructor() { }

  ngOnInit() {}

}
