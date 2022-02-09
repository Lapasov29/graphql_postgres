import model from './model.js'

export default{
    Mutation: {
        addCategory: async (_, args) => {
            try {
                const res = await model.addCategory(args)
                console.log(1, res);
                return {
                    status: 200,
                    message: "OK",
                    newCategory: res[0]
                }
            } catch (error) {
                console.log(3, error.message);
                return {
                    status: 400,
					message: error.message,
					data: null
                }
            }
        }
    },

    Query: {
        categories: async (_, args) => {
            return await model.getCategory(args)
        }
    }
}