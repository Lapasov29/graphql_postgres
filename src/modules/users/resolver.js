import model from './model.js'
import jwt from 'jsonwebtoken'

export default{
    Mutation: {
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
        users: async (_, args) => {
            try{
                return await model.getUsers(args)
            }catch(error){
                console.log(error.message);
            }
        }
    }
}