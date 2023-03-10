import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { map } from 'rxjs/operators';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {
 
  users!: any;
  usersRef$!: any;
  hasMoreToLoad: boolean = false;
  cursor: string | undefined= "";

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadData();
 
   }
 
 
   loadData() {
     this.usersRef$ = this.userService.getAllUsers();

     this.users = this.usersRef$.valueChanges.pipe(
       map((result:any) => {  
         
         this.hasMoreToLoad = result.data.users.pageInfo.hasNextPage;
         this.cursor = result.data.users.pageInfo.endCursor;
         
         return result.data.users.nodes;
       })
     );
 
 
   }
 
   
 
   loadMore() {
 
     this.usersRef$.fetchMore({
       variables: { first: 20,
         after: this.cursor},      
       updateQuery: (previousResult: any, { fetchMoreResult } : {fetchMoreResult : any}) => {        
         //if (!fetchMoreResult) return previousResult
         
         const newNodes = fetchMoreResult.users.nodes;
         const newEdges = fetchMoreResult.users.edges;
         const pageInfo = fetchMoreResult.users.pageInfo;
         
         this.hasMoreToLoad = fetchMoreResult.users.pageInfo.hasNextPage;
        
         
         return { 
           ...previousResult,
           users: {
           edges:  [...previousResult.users.edges, ...newEdges],
           totalCount: previousResult.users.totalCount,
           nodes: [...previousResult.users.nodes, ...newNodes],
           pageInfo: pageInfo,
           __typename: 'userConnection'                 
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
  

}
