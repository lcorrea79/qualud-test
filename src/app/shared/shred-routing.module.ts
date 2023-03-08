import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoConnectionPage } from './pages/no-connection/no-connection.page';

const routes: Routes = [
  {
    path: 'no-connection',
    component: NoConnectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
