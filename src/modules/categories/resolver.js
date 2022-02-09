import model from './model.js'

export default{
    Query: {
        categories: async (_, args) => {
            return await model.getCategory(args)
        }
    }
}