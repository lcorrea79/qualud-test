import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import * as Apollo from 'apollo-angular';
import { Maybe, PageInfo, Scalars, UserEdge, User, UserConnection, QueryCommentArgs, QueryUserArgs, Post, QueryPostArgs, CreatePostInput, MutationCreatePostArgs, Todo } from './generated';

export type TodoConnectionFragment = { __typename?: 'todoConnection', 
/** A list of edges. */
edges?: Maybe<Array<Maybe<UserEdge>>>,
/** A list of nodes. */
nodes?: Todo[],
/** Information to aid in pagination. */
pageInfo: PageInfo,
/** Total count of items */
totalCount: number
}

export type GetAllTodosQuery = { __typename?: 'Query', todos: { __typename?: 'todoConnection', 
/** A list of edges. */
edges?: Maybe<Array<Maybe<UserEdge>>>,
/** A list of nodes. */
nodes?: Todo[],
/** Information to aid in pagination. */
pageInfo: PageInfo,
/** Total count of items */
totalCount: number
}
};


export const TodoConnectionInfoFragmentDoc = gql`
    fragment TodoConnectionInfo on todoConnection {
      edges { cursor }   
      nodes { dueOn id status title user {id name email} userId }   
      pageInfo { endCursor hasNextPage hasPreviousPage startCursor}
      totalCount
}    
`;

export const TodoConnectionInfoFragmentDocument = gql`
    query GetAllTodos {
     todos {
    ...TodoConnectionInfo
  }
} ${TodoConnectionInfoFragmentDoc}   
`;


@Injectable({
    providedIn: 'root'
  })
  export class GetAllTodosGQL extends Apollo.Query<GetAllTodosQuery> {
    
    override document = TodoConnectionInfoFragmentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }

/*
export type PostInfoFragment = { __typename?: 'post', 
 id: number,
 title: string,
 body: string
}

export type GetPostByIdQuery = { __typename?: 'Query', post: { __typename?: 'post', id: number, title: string, body: string } };

export const PostInfoFragmentDoc = gql`
    fragment PostInfo on post {      
      id
      title
      body
}    
`;

export const PostInfoFragmentDocument = gql`
    query GetPostById($id: ID!) {
     user(id: $id) {
    ...UserInfo
  }
} ${PostInfoFragmentDoc}   
`;

@Injectable({
    providedIn: 'root'
  })
  export class GetPostByIdGQL extends Apollo.Query<GetPostByIdQuery, QueryPostArgs> {
    
    override document = PostInfoFragmentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
*/


  