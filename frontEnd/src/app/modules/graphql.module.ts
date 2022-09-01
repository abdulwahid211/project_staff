import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS, Apollo} from 'apollo-angular';
import {ApolloClientOptions} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache, ApolloLink} from '@apollo/client/core';
import {setContext} from '@apollo/client/link/context';
import {AUTH_TOKEN} from 'src/app/graphql/constants';

const uri = 'http://localhost:3001/';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const token = localStorage.getItem(AUTH_TOKEN);

  const auth = setContext(async (_, {headers}) => {
    let token = localStorage.getItem(AUTH_TOKEN);

    if (!token) {
      token = localStorage.getItem(AUTH_TOKEN);
    }
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  });

  const link = ApolloLink.from([auth, httpLink.create({uri})]);

  return {
    link: link,
    cache: new InMemoryCache(),
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  };
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
