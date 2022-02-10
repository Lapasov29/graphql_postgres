import fetch from '../../utils/postgres.js'
const ORDERS = `
    SELECT 
        *
    FROM orders
`
const PRODUCTS = `
    SELECT 
        *
    FROM products
`

const ADD_ORDERS = `
    INSERT INTO orders (user_id, products) VALUES 
    ($1, $2)
    
`

const CHANGE_ORDERS = `
    UPDATE orders o SET
        products = (
            CASE WHEN $3 > ARRAY[0] THEN $3 ELSE o.products END
        ),
        isPad = (
            CASE WHEN $4 IN (TRUE, FALSE) THEN $4 ELSE o.isPad END
        )
    WHERE order_id = $1 AND user_id = $2
    RETURNING *
`

const DELETE_ORDERS = `
    DELETE FROM orders
	WHERE order_id = $1 AND user_id = $2
	RETURNING *
`
const getOrder = async() => {
    let orders = await fetch(ORDERS)
    let products = await fetch(PRODUCTS)
    return {orders, products}
}
const addOrder = ({user_id, products}) => fetch(ADD_ORDERS, user_id, products)
const updateOrder = ({order_id, user_id, products, isPaid}) => fetch(CHANGE_ORDERS, order_id, user_id, products, isPaid)
const deleteOrder = ({order_id, user_id}) => fetch(DELETE_ORDERS, order_id, user_id)

export default {
    getOrder,
    addOrder,
    updateOrder,
    deleteOrder
}