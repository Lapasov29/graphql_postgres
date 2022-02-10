import model from './model.js'

export default{
    Mutation: {
        addUser: async (_, args) => {
            try {
                const res = await model.addUser(args)
                return {
                    status: 200,
                    message: "OK",
                    newUser: res[0]
                }
            } catch (error) {
                return {
                    status: 400,
					message: error.message,
					data: null
                }
            }
        },
        updateUser: async(_, args) => {
            try {
                const res = await model.updateUser(args)
                console.log(res);
                return {
                    status: 200,
                    message: "OK",
                    newUser: res[0]
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
        deleteUser: async(_, args) => {
            try {
                const res = await model.deleteUser(args)
                return {
                    status: 200,
                    message: "OK",
                    newUser: res[0]
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
        users: async (_, args) => {
            try{
                return await model.getUsers(args)
            }catch(error){
                console.log(error.message);
            }
        }
    }
}