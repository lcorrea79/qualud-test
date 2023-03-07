import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoCreatePage } from './pages/todo-create/todo-create.page';

import { TodoListPage } from './pages/todo-list/todo-list.page';

const routes: Routes = [
  {
    path: '',
    component: TodoListPage
  },
  {
    path: 'list',
    component: TodoListPage
  },
  {
    path: 'create',
    component: TodoCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
