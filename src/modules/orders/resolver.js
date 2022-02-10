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
                    order: res[0]
                }
            } catch (error) {
                return {
                    status: 400,
					message: error.message,
					data: null
                }
            }
        },
        updateOrder: async(_, args, context) => {
            try {
                console.log(args);
                if(args.user_id != context.user_id) throw new Error("Cannot update order of this user!")
                const res = await model.updateOrder(args)
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
        deleteOrder: async(_, args, context) => {
            console.log(args);
            try {
                const res = await model.deleteOrder(args)
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
        orders: async (_, args, context) => {
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