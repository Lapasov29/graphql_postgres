import fetch from '../../utils/postgres.js'

const ORDERS = `
    SELECT 
        *
    FROM orders
`

const ADD_ORDERS = `
    INSERT INTO orders (name)
    VALUES ($1)
    RETURNING *
`

const CHANGE_ORDERS = `
    UPDATE orders c SET
        name = (
            CASE WHEN LENGTH($2) > 0 THEN $2 ELSE c.name END
        )
    WHERE category_id = $1
    RETURNING *
`

const DELETE_ORDERS = `
    DELETE FROM orders
	WHERE category_id = $1
	returning category_id, name
`

const getOrder = () => fetch(ORDERS)
const addOrder = ({}) => fetch(ADD_ORDERS)
const updateOrder = ({}) => fetch(CHANGE_ORDERS)
const deleteOrder = ({}) => fetch(DELETE_ORDERS)

export default {
    getOrder,
    addOrder,
    updateOrder,
    deleteOrder
}