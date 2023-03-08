import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateTodoInput } from 'src/app/graphql/generated';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent  implements OnInit {

  @Output() createTodo: EventEmitter<CreateTodoInput> = new EventEmitter<CreateTodoInput>();
  protected readonly form: FormGroup = this.fb.nonNullable.group({
		title: ['', [Validators.required]],
		dueOn: ['', [Validators.required]],
    status: ['pending'],

	});
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form.markAllAsTouched();		

  }

  emitCreateTodo(){
			// get data
		const createPostInput: CreateTodoInput = {
			title: this.form.get('title')?.value,
			dueOn: "2016-07-20T17:30:15+05:30",
      status: "pending",      
      userId: Number(localStorage.getItem("user_id"))
		};

    this.createTodo.emit(createPostInput);
  }

  onSubmit(){

	if (this.form.invalid) {
		return;
	}	
	this.emitCreateTodo();

  }


}
