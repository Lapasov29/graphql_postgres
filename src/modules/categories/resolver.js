import model from './model.js'

export default{
    Mutation: {
        addCategory: async (_, args) => {
            try {
                const res = await model.addCategory(args)
                return {
                    status: 200,
                    message: "OK",
                    category: res[0]
                }
            } catch (error) {
                return {
                    status: 400,
					message: error.message,
					data: null
                }
            }
        },
        updateCategory: async(_, args) => {
            try {
                const res = await model.updateCategory(args)
                console.log(res);
                return {
                    status: 200,
                    message: "OK",
                    category: res[0]
                }
            } catch (error) {
                console.log(error.message);
                return {
                    status: 400,
					message: error.message,
					data: null
                }
            }
        },
        deleteCategory: async(_, args) => {
            try {
                const res = await model.deleteCategory(args)
                console.log(res);
                return {
                    status: 200,
                    message: "OK",
                    category: res[0]
                }
            } catch (error) {
                console.log(error.message);
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