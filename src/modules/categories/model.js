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

`

const DELETE_CATEGORY = `

`

const getCategory = () => fetch(CATEGORIES)
const addCategory = ({name}) => fetch(ADD_CATEGORY, name)

export default {
    getCategory,
    addCategory
}