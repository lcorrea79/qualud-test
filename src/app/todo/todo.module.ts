import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoRoutingModule } from './todo-routing.module';
import { IonicModule } from '@ionic/angular';
import { TodoListPage } from './pages/todo-list/todo-list.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { TodoCreatePage } from './pages/todo-create/todo-create.page';



@NgModule({
  declarations: [TodoListPage, TodoCardComponent,TodoFormComponent, TodoCreatePage],
  imports: [
    CommonModule,
    TodoRoutingModule,
    IonicModule,
    SharedModule
  ]
})
export class TodoModule { }
