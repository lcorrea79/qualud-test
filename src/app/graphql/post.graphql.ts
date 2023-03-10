
import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import * as Apollo from 'apollo-angular';
import { Maybe, PageInfo, Scalars, UserEdge, Post, QueryPostArgs, MutationCreatePostArgs, CreatePostInput, InputMaybe, MutationDeletePostArgs, MutationCreateCommentArgs, MutationDeleteCommentArgs, QueryPostsArgs } from './generated';

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
      nodes { id title body user {  id name email } comments { nodes { id name email body } } userId}    
      pageInfo { endCursor hasNextPage hasPreviousPage startCursor}
      totalCount
}    
`;

export const PostConnectionInfoFragmentDocument = gql`
    query GetAllPosts($after: String, $before:String, $first:Int,$last:Int) {
     posts(after:$after, before:$before,first:$first,last:$last) {
    ...PostConnectionInfo
  }
} ${PostConnectionInfoFragmentDoc}   
`;


@Injectable({
    providedIn: 'root'
  })
  export class GetAllPostsGQL extends Apollo.Query<GetAllPostsQuery,QueryPostsArgs> {
    
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

export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'createPostPayload', clientMutationId?: string, post: Post | undefined } };



export const CreatePostDocument = gql`
    mutation CreatePost($input: createPostInput!) {
      createPost(input: $input) {
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
  

  /* Delete Post*/

export const DeletePostPayloadInfoFragmentDoc = gql`
fragment DeletePostPayloadInfo on deletePostPayload {      
  clientMutationId
  post { title body }
}    
`;

export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'deletePostPayload', clientMutationId?: string, post: Post | undefined } };




export const DeletePostDocument = gql`
mutation DeletePost($input: deletePostInput!) {
  deletePost(input: $input) {
...DeletePostPayloadInfo
}
} ${DeletePostPayloadInfoFragmentDoc}`;

@Injectable({
providedIn: 'root'
})
export class DeletePostGQL extends Apollo.Mutation<DeletePostMutation, MutationDeletePostArgs> {

override document = DeletePostDocument;

constructor(apollo: Apollo.Apollo) {
  super(apollo);
}
}



/* New Comment*/

export const CommentPayloadInfoFragmentDoc = gql`
    fragment CommentPayloadInfo on createCommentPayload {      
      clientMutationId
      comment { 
        body
        email
        id
        name
        post {id title}
        postId
       }
}    
`;

export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'createCommentPayload', clientMutationId?: string, comment: Comment | undefined } };

export const CreateCommentDocument = gql`
    mutation CreateComment($input: createCommentInput!) {
      createComment(input: $input) {
    ...CommentPayloadInfo
  }
} ${CommentPayloadInfoFragmentDoc}`;

@Injectable({
    providedIn: 'root'
  })
  export class CreateCommentGQL extends Apollo.Mutation<CreateCommentMutation, MutationCreateCommentArgs> {
    
    override document = CreateCommentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }

  /* Delete Comment*/

export const DeleteCommentPayloadInfoFragmentDoc = gql`
fragment DeleteCommentPayloadInfo on deleteCommentPayload {      
  clientMutationId
  comment { body
        email
        id
        name
        post {id title}
        postId }
}    
`;

export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'deleteCommentPayload', clientMutationId?: string, comment: Comment | undefined } };




export const DeleteCommentDocument = gql`
mutation DeleteComment($input: deleteCommentInput!) {
  deleteComment(input: $input) {
...DeleteCommentPayloadInfo
}
} ${DeleteCommentPayloadInfoFragmentDoc}`;

@Injectable({
providedIn: 'root'
})
export class DeleteCommentGQL extends Apollo.Mutation<DeleteCommentMutation, MutationDeleteCommentArgs> {

override document = DeleteCommentDocument;

constructor(apollo: Apollo.Apollo) {
  super(apollo);
}
}
