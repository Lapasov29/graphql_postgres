import model from './model.js'

export default{
    Mutation: {
        addCategory: async (_, args, context) => {
            try {
                let { name } = args
                if(!(name.length > 0)) throw new Error("Invalid input!")
                const res = await model.addCategory(args)
                return {
                    status: 200,
                    message: "OK",
                }
            } catch (error) {
                return {
                    status: 400,
					message: error.message
                }
            }
        },

        updateCategory: async(_, args, context) => {
            try {
                let { category_id, name } = args
                if( category_id < 1 || name.length <= 0) throw new Error("Invalid input!")
                const res = await model.updateCategory(args)
                if(res.length == 0) throw new Error("There is no such category!")
                return {
                    status: 200,
                    message: "OK",
                }
            } catch (error) {
                return {
                    status: 400,
					message: error.message,
                }
            }
        },
        deleteCategory: async(_, args, context) => {
            try {
                let { category_id } = args
                if(category_id < 1) throw new Error("Invalid input!")
                const res = await model.deleteCategory(args)
                if(res.length == 0) throw new Error("There is no such category!")
                return {
                    status: 200,
                    message: "OK"
                }
            } catch (error) {
                return {
                    status: 400,
					message: error.message,
                }
            }
        }
    },

    Query: {
        categories: async (_, args) => {
            try {
                const res = await model.getCategory(args)
                return res
            } catch (error) {
                return error.message
            }
        }
    }
}