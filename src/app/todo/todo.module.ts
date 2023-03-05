import { TodoRoutingModule } from './todo-routing.module';
import { IonicModule } from '@ionic/angular';
import { TodoListPage } from './pages/todo-list/todo-list.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [TodoListPage],
  imports: [
    CommonModule,
    TodoRoutingModule,
    IonicModule,
    SharedModule
  ]
})
export class TodoModule { }