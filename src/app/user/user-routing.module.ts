import { NgModule } from '@angular/core';
import { UserListPage } from './pages/user-list/user-list.page';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: UserListPage
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule{}