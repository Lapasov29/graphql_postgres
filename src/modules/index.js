import { makeExecutableSchema } from '@graphql-tools/schema'

import categoryModule from './categories/index.js'

export default makeExecutableSchema({
    typeDefs: [
        categoryModule.typeDefs
    ],
    resolvers: [
        categoryModule.resolvers
    ]
})