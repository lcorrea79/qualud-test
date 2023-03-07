
import { CommentCardComponent } from './components/comment-card/comment-card.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { PostListPage } from './pages/post-list/post-list.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostRoutingModule } from './post-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostCreatePage } from './pages/post-create/post-create.page';
import { MaterialModule } from '../app.module';
import { PostFormComponent } from './components/post-form/post-form.component';



@NgModule({
  declarations: [PostListPage, PostCreatePage, PostCardComponent, PostFormComponent, CommentCardComponent],
  imports: [
    PostRoutingModule,
    CommonModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,FormsModule
  ]
})
export class PostModule { }
