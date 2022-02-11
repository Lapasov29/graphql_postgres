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
        WHEN $3 > 0 THEN category_id = $3
        ELSE TRUE
    END AND

    CASE
        WHEN LENGTH($4) > 0 THEN (
            name ILIKE CONCAT('%', $4, '%')
        ) ELSE TRUE
    END AND

    CASE 
        WHEN $5 > 0 AND $6 > 0 THEN price BETWEEN $5 AND $6
        ELSE TRUE
    END
    ORDER BY product_id
	offset $7 limit $8
`

const ADD_PRODUCT = `
    INSERT INTO products 
    (category_id, name, price, short_info, long_info, img_url) VALUES
    ($1, $2, $3, $4, $5, $6)
    RETURNING *
`

const CHANGE_PRODUCT = `
    UPDATE products p SET
        category_id = (
            CASE WHEN $2 > 0 THEN $2 ELSE p.category_id END
        ), 
        name = (
            CASE WHEN LENGTH($3) > 0 THEN $3 ELSE p.name END
        ),
        price = (
            CASE WHEN $4 > 0 THEN $4 ELSE p.price END
        ), 
        short_info = (
            CASE WHEN LENGTH($5) > 0 THEN $5 ELSE p.short_info END
        ), 
        long_info = (
            CASE WHEN LENGTH($6) > 0 THEN $6 ELSE p.long_info END
        ), 
        img_url = (
            CASE WHEN LENGTH($7) > 0 THEN $7 ELSE p.img_url END
        )
    WHERE product_id = $1
    RETURNING *
`

const DELETE_PRODUCT = `
    DELETE FROM products
	WHERE product_id = $1
	returning *
`

const getProducts = ({pagination: {page, limit}, filter: {category_id, name, from, to}, search, product_id, }) => fetch(PRODUCTS, product_id, search, category_id, name, from, to, (page - 1) * limit, limit)
const addProduct = ({category_id, name, price, short_info, long_info, img_url}) => fetch(ADD_PRODUCT, category_id, name, price, short_info, long_info, img_url)
const updateProduct = ({product_id, category_id, name, price, short_info, long_info, img_url}) => fetch(CHANGE_PRODUCT, product_id, category_id, name, price, short_info, long_info, img_url)
const deleteProduct = ({product_id}) => fetch(DELETE_PRODUCT, product_id)

export default {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
}

// CASE
//         WHEN  THEN (
//             CASE 
//                 WHEN $3 > 0 THEN category_id = $3
//                 ELSE TRUE
//             END AND
//             CASE
//                 WHEN LENGTH($4) > 0 THEN (
//                     name ILIKE CONCAT('%', $4, '%')
//                 ) ELSE TRUE 
//             END AND
//             CASE 
//                 WHEN price BETWEEN $5 AND $6 THEN price
//                 ELSE TRUE
//             END
//         ) ELSE TRUE
//     END