//https://akryum.github.io/vue-apollo/guide/installation.html#apollo-client

import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

export default ({ app, router, store, Vue }) => {

  const httpLink = new HttpLink({
  // You should use an absolute URL here
    uri: 'http://dev-auth.fixingthe.net/graphql',
  })

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

// Install the vue plugin
  Vue.use(VueApollo)

  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
  })

  app.provide=apolloProvider.provide()
}
