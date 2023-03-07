import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCreatePage } from './pages/post-create/post-create.page';


import { PostListPage } from './pages/post-list/post-list.page';

const routes: Routes = [
  {
    path: '',
    component: PostListPage
  },
  {
    path: 'list',
    component: PostListPage
  },
  {
    path: 'create',
    component: PostCreatePage    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
