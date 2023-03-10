import { Injectable } from '@angular/core';
import { gql } from 'apollo-angular';
import * as Apollo from 'apollo-angular';
import { Maybe, PageInfo, Scalars, UserEdge, User, UserConnection, QueryCommentArgs, QueryUserArgs, Post, QueryPostArgs, CreatePostInput, MutationCreatePostArgs, Todo, MutationCreateTodoArgs, MutationDeleteTodoArgs, MutationUpdateTodoArgs, QueryTodosArgs } from './generated';

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
    query GetAllTodos($after: String, $before:String, $first:Int,$last:Int) {
     todos(after:$after, before:$before,first:$first,last:$last) {
    ...TodoConnectionInfo
  }
} ${TodoConnectionInfoFragmentDoc}   
`;


@Injectable({
    providedIn: 'root'
  })
  export class GetAllTodosGQL extends Apollo.Query<GetAllTodosQuery, QueryTodosArgs> {
    
    override document = TodoConnectionInfoFragmentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }


/* New ToDo*/


export const TodoPayloadInfoFragmentDoc = gql`
    fragment TodoPayloadInfo on createTodoPayload {      
      clientMutationId
      todo { dueOn             
             id
             status
             title
             user { id name email }
             }
}    
`;

export type CreateTodoMutation = { __typename?: 'Mutation', createTodo: { __typename?: 'createTodoPayload', clientMutationId?: string, todo: Todo | undefined } };

export const CreateTodoDocument = gql`
    mutation CreateTodo($todoInputCreate: createTodoInput!) {
      createTodo(input: $todoInputCreate) {
    ...TodoPayloadInfo
  }
} ${TodoPayloadInfoFragmentDoc}`;

@Injectable({
    providedIn: 'root'
  })
  export class CreateTodoGQL extends Apollo.Mutation<CreateTodoMutation, MutationCreateTodoArgs> {
    
    override document = CreateTodoDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
  
  /* Update ToDo*/


export const UpdateTodoPayloadInfoFragmentDoc = gql`
fragment UpdateTodoPayloadInfo on updateTodoPayload {      
  clientMutationId
  todo { dueOn             
         id
         status
         title
         user { id name email }
         }
}    
`;

export type UpdateTodoMutation = { __typename?: 'Mutation', updateTodo: { __typename?: 'updateTodoPayload', clientMutationId?: string, todo: Todo | undefined } };




export const UpdateTodoDocument = gql`
mutation UpdateTodo($todoInputUpdate: updateTodoInput!) {
  updateTodo(input: $todoInputUpdate) {
...UpdateTodoPayloadInfo
}
} ${UpdateTodoPayloadInfoFragmentDoc}`;

@Injectable({
providedIn: 'root'
})
export class UpdateTodoGQL extends Apollo.Mutation<UpdateTodoMutation, MutationUpdateTodoArgs> {

override document = CreateTodoDocument;

constructor(apollo: Apollo.Apollo) {
  super(apollo);
}
}

  /* Delete Todo*/

export const DeleteTodoPayloadInfoFragmentDoc = gql`
fragment DeleteTodoPayloadInfo on deleteTodoPayload {      
  clientMutationId
  todo { dueOn             
             id
             status
             title
             user { id name email }
       }
}    
`;

export type DeleteTodoMutation = { __typename?: 'Mutation', deleteTodo: { __typename?: 'deleteTodoPayload', clientMutationId?: string, todo: Todo | undefined } };




export const DeleteTodoDocument = gql`
mutation DeleteTodo($input: deleteTodoInput!) {
  deleteTodo(input: $input) {
...DeleteTodoPayloadInfo
}
} ${DeleteTodoPayloadInfoFragmentDoc}`;

@Injectable({
providedIn: 'root'
})
export class DeleteTodoGQL extends Apollo.Mutation<DeleteTodoMutation, MutationDeleteTodoArgs> {

override document = DeleteTodoDocument;

constructor(apollo: Apollo.Apollo) {
  super(apollo);
}
}
