import model from './model.js'

export default{
    Mutation: {
        addOrder: async (_, args, context) => {
            try {
                if(args.user_id != context.user_id) throw new Error("Cannot add order to this user!")
                const res = await model.addOrder(args)
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
        updateOrder: async(_, args, context) => {
            try {
                if(args.user_id != context.user_id) throw new Error("Cannot update order of this user!")
                const res = await model.updateOrder(args)
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
        deleteOrder: async(_, args, context) => {
            try {
                if(context.role == 2){
                    if(args.user_id != context.user_id){
                        throw new Error("Cannot delete order of this user!")
                    }
                }
                const res = await model.deleteOrder(args)
                if(res.length == 0) throw new Error("There is no such order!")
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
        }
    },

    Query: {
        orders: async (_, args, context) => {
            if(context.role == 2 && args.user_id){
                throw new Error("Permission denied!")
            }else if(context.role == 2){
                args.user_id = context.user_id
            }
            let {orders, products} = await model.getOrder(args)
            
            for(let ord of orders){
                ord.totalPrice = 0
                for(let id in ord.products){
                    products.forEach(pro => {
                        if(pro.product_id == ord.products[id]){
                            ord.totalPrice += pro.price 
                            ord.products[id] = pro
                        }
                    })
                }
            }
            return orders
        }
    }
}