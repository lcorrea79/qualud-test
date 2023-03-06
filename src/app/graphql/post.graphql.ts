import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import * as Apollo from 'apollo-angular';
import { Maybe, PageInfo, Scalars, UserEdge, User, UserConnection, QueryCommentArgs, QueryUserArgs, Post, QueryPostArgs, CreatePostInput, MutationCreatePostArgs } from './generated';

export type PostConnectionFragment = { __typename?: 'postConnection', 
/** A list of edges. */
edges?: Maybe<Array<Maybe<UserEdge>>>,
/** A list of nodes. */
nodes?: Post[],
/** Information to aid in pagination. */
pageInfo: PageInfo,
/** Total count of items */
totalCount: number
}

export type GetAllPostsQuery = { __typename?: 'Query', posts: { __typename?: 'postConnection', 
/** A list of edges. */
edges?: Maybe<Array<Maybe<UserEdge>>>,
/** A list of nodes. */
nodes?: Post[],
/** Information to aid in pagination. */
pageInfo: PageInfo,
/** Total count of items */
totalCount: number
}
};


export const PostConnectionInfoFragmentDoc = gql`
    fragment PostConnectionInfo on postConnection {
      edges { cursor }   
      nodes { id title body user {  id name email } comments { nodes { name email body }}}   
      pageInfo { endCursor hasNextPage hasPreviousPage startCursor}
      totalCount
}    
`;

export const PostConnectionInfoFragmentDocument = gql`
    query GetAllPosts {
     posts {
    ...PostConnectionInfo
  }
} ${PostConnectionInfoFragmentDoc}   
`;


@Injectable({
    providedIn: 'root'
  })
  export class GetAllPostsGQL extends Apollo.Query<GetAllPostsQuery> {
    
    override document = PostConnectionInfoFragmentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }


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

/* New Post*/

export const PostPayloadInfoFragmentDoc = gql`
    fragment PostPayloadInfo on createPostPayload {      
      clientMutationId
      post { title body }
}    
`;

export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'createPostPayload', clientMutationId?: Maybe<Scalars['String']>, post: Maybe<Post> } };


export const CreatePostDocument = gql`
    mutation CreatePost($postInputCreate: CreatePostInput!) {
      createPost(input: $postInputCreate) {
    ...PostPayloadInfo
  }
} ${PostPayloadInfoFragmentDoc}`;

@Injectable({
    providedIn: 'root'
  })
  export class CreatePostGQL extends Apollo.Mutation<CreatePostMutation, MutationCreatePostArgs> {
    
    override document = CreatePostDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
  