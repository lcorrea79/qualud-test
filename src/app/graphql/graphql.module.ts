import { merge } from 'rxjs';
import { environment } from './../../environments/environment';
import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache, ApolloLink, Reference} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';

const uri = environment.gorest_graphql_url; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {

  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));
 
  const auth = setContext((operation, context) => {
    const token = environment.access_token;
 
    if (token === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }
  });

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  //const cache: InMemoryCache = new InMemoryCache();
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            merge(existing, incoming) {
              return { ...existing, ...incoming };
            }
          },
          users: {
            merge(existing, incoming) {
              return { ...existing, ...incoming };
            }
          },
          todos: {
            merge(existing, incoming) {
              return { ...existing, ...incoming };
            }
          }
        }
      }
    }
  });
 
  return {
    link,
    cache,
  };

  function offsetFromCursor(items:any, cursor:any, readField:any) {
    // Search from the back of the list because the cursor we're
    // looking for is typically the ID of the last item.
    for (let i = items.length - 1; i >= 0; --i) {
      const item = items[i];
      // Using readField works for both non-normalized objects
      // (returning item.id) and normalized references (returning
      // the id field from the referenced entity object), so it's
      // a good idea to use readField when you're not sure what
      // kind of elements you're dealing with.
      if (readField('id', item) === cursor) {
        // Add one because the cursor identifies the item just
        // before the first item in the page we care about.
        return i + 1;
      }
    }
    // Report that the cursor could not be found.
    return -1;
  }
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
