import { makeExecutableSchema } from '@graphql-tools/schema'

import TypesModule from './types/index.js'
import categoryModule from './categories/index.js'
import productModule from './products/index.js'
import orders from './orders/index.js'
import users from './users/index.js'

export default makeExecutableSchema({
    typeDefs: [
        TypesModule.typeDefs,
        categoryModule.typeDefs,
        productModule.typeDefs,
        orders.typeDefs,
        users.typeDefs
    ],
    resolvers: [
        TypesModule.resolvers,
        categoryModule.resolvers,
        productModule.resolvers,
        orders.resolvers,
        users.resolvers
    ]
})