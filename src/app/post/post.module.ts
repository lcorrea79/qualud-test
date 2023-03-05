import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { PostListPage } from './pages/post-list/post-list.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';



@NgModule({
  declarations: [PostListPage],
  imports: [
    PostRoutingModule,
    CommonModule,
    IonicModule,
    SharedModule
  ]
})
export class PostModule { }
