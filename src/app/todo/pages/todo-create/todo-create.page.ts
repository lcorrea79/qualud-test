import { AuthService } from './../../../core/services/auth.service';
import { TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';

import {  Router } from '@angular/router';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.page.html',
  styleUrls: ['./todo-create.page.scss'],
})
export class TodoCreatePage implements OnInit {

  spinner: boolean = false;
  constructor(private todoService: TodoService,
              private router: Router,
              private auth: AuthService,
              private toastController: ToastController ) { }

  ngOnInit() {
  }

  async presentToast(text: string, position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: text,
      duration: 1500,
      position: position
    });

    await toast.present();
  }

  createTodo($event: any){
    $event.userId = this.auth.currentUserValue.id;
    $event.clientMutationId = "abc1";
    
     this.spinner = true;
     this.todoService.createTodo( $event ).subscribe(
      data => {        
        this.spinner = false
        ;
        this.router.navigate(['/todo'])
          .then(() => {
            window.location.reload();
          });
      }, error => {
        this.spinner = false;
        this.presentToast("An unexpected error has occurred, please try again later.", 'bottom');
        
      }
     )
  }

}
