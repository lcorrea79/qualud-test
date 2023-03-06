import { User, QueryUserArgs } from './../../graphql/generated';
import { UserConnectionFragment, GetUserByIdGQL, UserInfoFragment } from './../../graphql/user.graphql';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { GetAllUsersGQL } from 'src/app/graphql/user.graphql';



@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private getUsersGQL: GetAllUsersGQL,
              private getUserByIdGQL: GetUserByIdGQL) { }

  public getAllUsers(): Observable<UserConnectionFragment> {  
    return this.getUsersGQL.watch().valueChanges.pipe(map((res) => res.data.users));
  }

  public getUserById({ id }: QueryUserArgs): Observable<UserInfoFragment> {  
    return this.getUserByIdGQL.watch({ id }).valueChanges.pipe(map((res) => res.data.user));
  }

}
