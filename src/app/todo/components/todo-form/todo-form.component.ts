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
		dueOn: [(new Date()).toISOString(), [Validators.required]],
    status: [false],

	});
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form.markAllAsTouched();		

  }

  emitCreateTodo(){
			// get data
		const createPostInput: CreateTodoInput = {
			title: this.form.get('title')?.value,
			dueOn: this.form.get('dueOn')?.value,
      status: this.form.get('status')?.value == true?'completed':'pending',      
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
