import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { PostListPage } from './pages/post-list/post-list.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [PostListPage, PostCardComponent, CommentCardComponent],
  imports: [
    PostRoutingModule,
    CommonModule,
    IonicModule,
    SharedModule,FormsModule
  ]
})
export class PostModule { }
