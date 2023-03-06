import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then( m => m.HomeModule)
  },
  {
    path: 'user-list',
    loadChildren: () => import('./user/user.module').then( m => m.UserModule)
  },
  {
    path: 'post-list',
    loadChildren: () => import('./post/post.module').then( m => m.PostModule)
  },
  {
    path: 'todo-list',
    loadChildren: () => import('./todo/todo.module').then( m => m.TodoModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./home/home.module').then( m => m.HomeModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes/*, { preloadingStrategy: PreloadAllModules }*/)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
