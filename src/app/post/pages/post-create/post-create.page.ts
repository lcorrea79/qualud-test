import { CreatePostInput } from './../../../graphql/generated';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.page.html',
  styleUrls: ['./post-create.page.scss'],
})
export class PostCreatePage implements OnInit {

  constructor(private postService: PostService,
             private router: Router, private nav: NavController)
   { }

  ngOnInit() {
  }

  createPost($event: CreatePostInput){

    $event.userId = Number(localStorage.getItem("user_id"));
    $event.clientMutationId = "abc1";
     this.postService.createPost( $event ).subscribe(
      data => {
        
        this.router.navigate(['./post']);
        //this.nav.navigateBack(['/post'])
      }
     )
  }
  
}
