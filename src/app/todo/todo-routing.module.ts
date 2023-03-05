import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoListPage } from './pages/todo-list/todo-list.page';

const routes: Routes = [
  {
    path: '',
    component: TodoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
