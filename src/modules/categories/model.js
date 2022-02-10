import fetch from '../../utils/postgres.js'

const CATEGORIES = `
    SELECT 
        *
    FROM categories
`

const ADD_CATEGORY = `
    INSERT INTO categories (name)
    VALUES ($1)
    RETURNING *
`

const CHANGE_CATEGORY = `
    UPDATE categories c SET
        name = (
            CASE WHEN LENGTH($2) > 0 THEN $2 ELSE c.name END
        )
    WHERE category_id = $1
    RETURNING *
`

const DELETE_CATEGORY = `
    DELETE FROM categories
	WHERE category_id = $1
	returning category_id, name
`

const getCategory = () => fetch(CATEGORIES)
const addCategory = ({name}) => fetch(ADD_CATEGORY, name)
const updateCategory = ({category_id, name}) => fetch(CHANGE_CATEGORY, category_id, name)
const deleteCategory = ({category_id}) => fetch(DELETE_CATEGORY, category_id)

export default {
    getCategory,
    addCategory,
    updateCategory,
    deleteCategory
}