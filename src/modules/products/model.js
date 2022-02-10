import fetch from '../../utils/postgres.js'

const PRODUCTS = `
    SELECT 
        *
    FROM products
    WHERE
    CASE
        WHEN $1 > 0 THEN product_id = $1
        ELSE TRUE
    END AND
    CASE
		WHEN LENGTH($2) > 0 THEN (
			name ILIKE CONCAT('%', $2, '%')
		) ELSE TRUE
	END AND
    CASE
        WHEN TRUE THEN (
            CASE 
                WHEN $3 > 0 THEN category_id = $3
                ELSE TRUE
            END AND
            CASE
                WHEN LENGTH($4) > 0 THEN (
                    name ILIKE CONCAT('%', $4, '%')
                ) ELSE TRUE 
            END AND
            CASE 
                WHEN price BETWEEN $5 AND $6 THEN
                ELSE TRUE
            END
        ) ELSE TRUE
    END
    ORDER BY product_id
	offset $7 limit $8
`

const ADD_PRODUCT = `
    INSERT INTO orders (name)
    VALUES ($1)
    RETURNING *
`

const CHANGE_PRODUCT = `
    UPDATE orders c SET
        name = (
            CASE WHEN LENGTH($2) > 0 THEN $2 ELSE c.name END
        )
    WHERE category_id = $1
    RETURNING *
`

const DELETE_PRODUCT = `
    DELETE FROM orders
	WHERE category_id = $1
	returning category_id, name
`

const getProducts = ({pagination: {page, limit}, filter: {category_id, name, from, to}, search, product_id, }) => fetch(PRODUCTS, product_id, search, category_id, name, from, to, page, limit)
const addProduct = ({}) => fetch(ADD_PRODUCT)
const updateProduct = ({}) => fetch(CHANGE_PRODUCT)
const deleteProduct = ({}) => fetch(DELETE_PRODUCT)

export default {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
}