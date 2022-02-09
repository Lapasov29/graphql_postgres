import { 
    ApolloServerPluginLandingPageGraphQLPlayground, 
    ApolloServerPluginDrainHttpServer,
  } from 'apollo-server-core'
  import { ApolloServer } from 'apollo-server-express'
  import express from 'express'
  import http from 'http'
  import '../config.js'

  import context from './context.js'
  
  import schema from './modules/index.js'
  
  async function startApolloServer() {
  
      const app = express()

      const httpServer = http.createServer(app)
  
      const server = new ApolloServer({
          introspection: true,
          schema,
          plugins: [
              ApolloServerPluginLandingPageGraphQLPlayground(),
              ApolloServerPluginDrainHttpServer({ httpServer })
          ],
      })
      
      await server.start()
      server.applyMiddleware({ app })
      await new Promise(resolve => httpServer.listen({ port: process.env.PORT || 4000 }, resolve))
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  }
  
  startApolloServer()   