import { CreatePostInput } from './../../../graphql/generated';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/graphql/generated';
import { NumericValueAccessor, ViewDidEnter, ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.page.html',
  styleUrls: ['./post-list.page.scss'],
})
export class PostListPage implements OnInit,  ViewWillEnter {

  posts$! : Post[] | undefined;

  search: any = "";

  user_id: number = 0;

  constructor(private postService: PostService) { 
    this.user_id = Number( localStorage.getItem("user_id"));
  }

  ngOnInit() {
    console.log("en el ngOnInit");
    
  }


  loadData(){
    this.postService.getAllPosts().subscribe(
      data => {
        this.posts$ = data.nodes;
        console.log("loadData del post-list page", this.posts$);
      }
    );
  }

  ionViewWillEnter(){
    console.log("en el ionViewDidEnter");
    this.loadData();
  }


  deletePost($event: number){
    console.log("deletePost", $event);
    if ($event > 0)
     this.postService.deletePost({ clientMutationId:"xrv", id: $event}).subscribe(
      data => {
        this.loadData();
      }
     );
     
  }

  


}
