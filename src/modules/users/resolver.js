import model from './model.js'
import jwt from 'jsonwebtoken'

export default{
    Mutation: {
        updateUser: async(_, args, context) => {
            try {
                args.user_id = context.user_id
                const res = await model.updateUser(args)
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
        deleteUser: async(_, args, context) => {
            try {
                args.user_id = context.user_id
                const res = await model.deleteUser(args)
                if(res.length == 0) throw new Error("There is no such user!")
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
        login: async(_, args, context) => {
            try{
                const res = await model.login(args)
                if(res.length){
                    return {
                        status: 200,
                        message: "OK",
                        token: jwt.sign({ user_id: res[0].user_id, role: res[0].role,  agent: context['user-agent'] }, process.env.TOKEN_KEY)
                    }
                }
                throw new Error('Invalid username or password!')
            }catch(error){
                return {
                    status: 400,
				    message: error.message
                }
            }
        },
        register: async (_, args, context) => {
            try {
                const res = await model.addUser(args)
                return {
                    status: 200,
                    message: "OK",
                    token: jwt.sign({ user_id: res[0].user_id, role: res[0].role,  agent: context['user-agent'] }, process.env.TOKEN_KEY),
                }
            } catch (error) {
                return {
                    status: 400,
                    message: error.message,
                    data: null
                }
            }
        },
    },

    Query: {
        users: async (_, args, context) => {
                if(context.role == 2 && args.user_id){
                    throw new Error("Permission denied!")
                }else if(context.role == 2){
                    args.user_id = context.user_id
                }
                return await model.getUsers(args)
        }
    }
}