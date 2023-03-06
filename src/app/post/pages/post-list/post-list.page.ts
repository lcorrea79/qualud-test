import { CreatePostInput } from './../../../graphql/generated';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/graphql/generated';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.page.html',
  styleUrls: ['./post-list.page.scss'],
})
export class PostListPage implements OnInit {

  posts$! : Post[] | undefined;

  search: any = "";

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getAllPosts().subscribe(
      data => {
        this.posts$ = data.nodes;
        console.log(data);
      }
    );
  }

  createPost(){    
    this.postService.createPost({ body : "Probando desde GraphQL - Qualud",
    clientMutationId : "1", 
    title : "", 
    userId: 0 }).subscribe(
      data => {
        console.log("createPost"), data;
      }

    );
  }


}
