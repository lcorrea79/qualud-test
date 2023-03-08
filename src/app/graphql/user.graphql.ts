import { IonicModule } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import * as Apollo from 'apollo-angular';
import { Maybe, PageInfo, Scalars, UserEdge, User, UserConnection, QueryCommentArgs, QueryUserArgs } from './generated';

export type UserConnectionFragment = { __typename?: 'userConnection', 
/** A list of edges. */
edges?: Maybe<Array<Maybe<UserEdge>>>,
/** A list of nodes. */
nodes?: User[],
/** Information to aid in pagination. */
pageInfo: PageInfo,
/** Total count of items */
totalCount: number
}

export type GetAllUsersQuery = { __typename?: 'Query', users: { __typename?: 'userConnection', 
/** A list of edges. */
edges?: Maybe<Array<Maybe<UserEdge>>>,
/** A list of nodes. */
nodes?: User[],
/** Information to aid in pagination. */
pageInfo: PageInfo,
/** Total count of items */
totalCount: number
}
};


export const UserConnectionInfoFragmentDoc = gql`
    fragment UserConnectionInfo on userConnection {
      edges { cursor }   
      nodes { id name email gender posts { nodes { title body } } }   
      pageInfo { endCursor hasNextPage hasPreviousPage startCursor}
      totalCount
}    
`;

export const UserConnectionInfoFragmentDocument = gql`
    query GetAllUsers {
     users {
    ...UserConnectionInfo
  }
} ${UserConnectionInfoFragmentDoc}   
`;


@Injectable({
    providedIn: 'root'
  })
  export class GetAllUsersGQL extends Apollo.Query<GetAllUsersQuery> {
    
    override document = UserConnectionInfoFragmentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }


export type UserInfoFragment = { __typename?: 'user', 
 id: number,
 email: string,
 name: string
}

export type GetUserByIdQuery = { __typename?: 'Query', user: { __typename?: 'user', id: number, email: string, name: string } };

export const UserInfoFragmentDoc = gql`
    fragment UserInfo on user {      
      id
      email
      name
}    
`;

export const UserInfoFragmentDocument = gql`
    query GetUserById($id: ID!) {
     user(id: $id) {
    ...UserInfo
  }
} ${UserInfoFragmentDoc}   
`;

@Injectable({
    providedIn: 'root'
  })
  export class GetUserByIdGQL extends Apollo.Query<GetUserByIdQuery, QueryUserArgs> {
    
    override document = UserInfoFragmentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }


  