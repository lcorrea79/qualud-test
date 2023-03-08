import { CreatePostInput } from './../../../graphql/generated';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent  implements OnInit {

    @Output() createPost: EventEmitter<CreatePostInput> = new EventEmitter<CreatePostInput>();
	
	protected readonly form: FormGroup = this.fb.nonNullable.group({
		title: ['', [Validators.required]],
		body: ['', [Validators.required]],

	});

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form.markAllAsTouched();		

  }

  emitCreatePost(){
			// get data
		const createPostInput: CreatePostInput = {
			title: this.form.get('title')?.value,
			body: this.form.get('body')?.value,
      userId: 123
		};

		this.createPost.emit(createPostInput);
  }

  onSubmit(){

	if (this.form.invalid) {
		return;
	}	
	this.emitCreatePost();

  }

}
