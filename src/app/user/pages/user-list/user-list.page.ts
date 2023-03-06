import { Maybe, User } from './../../../graphql/generated';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { UserConnectionFragment } from 'src/app/graphql/user.graphql';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {
 
  users$! : User[] | undefined;
  constructor(private userService: UserService) { }

  ngOnInit() {
   
    
    this.userService.getAllUsers().subscribe(
      data =>
      {
        this.users$ = data.nodes;
        console.log("Info de Users", data);
      }
    );
/*
    this.userService.getUserById({ id: "830611" }).subscribe(
      data =>
      {
        console.log("Info de Users", data);
      }
    );*/

  }
  

}
