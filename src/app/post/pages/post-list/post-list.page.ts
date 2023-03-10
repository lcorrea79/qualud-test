import { map } from 'rxjs/operators';
import { QueryRef } from 'apollo-angular';
import { Comment, CreatePostInput, PageInfo, Query } from './../../../graphql/generated';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/graphql/generated';
import {  ToastController, ViewWillEnter } from '@ionic/angular';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';



const PER_PAGE = 10;

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.page.html',
  styleUrls: ['./post-list.page.scss'],
})
export class PostListPage implements OnInit, ViewWillEnter {



  posts!: any;
  postsRef$!: any;
  hasMoreToLoad: boolean = false;
  cursor: string | undefined= "";

  search: any = "";

  user_id: number = 0;

  constructor(private postService: PostService,
              public auth: AuthService,
              private toastController: ToastController
    ) {
    
  }

  ngOnInit() {
   this.loadData();

  }


  loadData() {
    this.postsRef$ = this.postService.getAllPosts();

    this.posts = this.postsRef$.valueChanges.pipe(
      map((result:any) => {  
        
        this.hasMoreToLoad = result.data.posts.pageInfo.hasNextPage;
        this.cursor = result.data.posts.pageInfo.endCursor;
        
        return result.data.posts.nodes;
      })
    );


  }

  

  loadMore() {

    this.postsRef$.fetchMore({
      variables: { first: 20,
        after: this.cursor},      
      updateQuery: (previousResult: any, { fetchMoreResult } : {fetchMoreResult : any}) => {        
        //if (!fetchMoreResult) return previousResult
        
        const newNodes = fetchMoreResult.posts.nodes;
        const newEdges = fetchMoreResult.posts.edges;
        const pageInfo = fetchMoreResult.posts.pageInfo;
        
        this.hasMoreToLoad = fetchMoreResult.posts.pageInfo.hasNextPage;
       
        
        return { 
          ...previousResult,
          posts: {
          edges:  [...previousResult.posts.edges, ...newEdges],
          totalCount: previousResult.posts.totalCount,
          nodes: [...previousResult.posts.nodes, ...newNodes],
          pageInfo: pageInfo,
          __typename: 'postConnection'                 
        } 
        }
      }
    });

  } 
  
  onIonInfinite(ev: any) {
    this.loadMore();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  ionViewWillEnter() {
    this.loadData();
  }

  async presentToast(text: string, position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: text,
      duration: 1500,
      position: position
    });

    await toast.present();
  }

  deletePost($event: number) {
    
    if ($event > 0)
      this.postService.deletePost({ clientMutationId: "xrv", id: $event }).subscribe(
        data => {

          
          this.posts.subscribe(
            (p:any) => {
           
              this.posts = Observable.create((observer:any) => {observer.next(p.filter((f:any) => f.id != $event ))})

            }
          );
          
        }
      );


  }

  deleteComment($event: number, post_id: number | undefined) {
    
    if ($event > 0)
      this.postService.deleteComment({ clientMutationId: "xrv", id: $event }).subscribe(
        data => {
          this.posts.subscribe(
            (p:any) => {
              
              let index = p.findIndex( (i:any) => i.id == post_id);
              let comments = p[index].comments.nodes;
              let index_comment = comments.filter( (c:any) => {c.id == $event});
              p[index].comments.nodes.splice( index_comment, 1);             
              this.posts = Observable.create((observer:any) => {observer.next(p)});

            }
          );

          //this.posts$?.filter(p => p.id == post_id)[0].comments.nodes?.filter(c => c?.id != $event);
        }, error => {
         // this.spinner = false;
          this.presentToast("An unexpected error has occurred, please try again later.", 'bottom');
          console.log(error);
        }
      );
  }


}
