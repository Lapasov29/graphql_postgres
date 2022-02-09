import fetch from '../../utils/postgres.js'

const CATEGORIES = `
    SELECT 
        *
    FROM categories
`

const CHANGE_CATEGORY = `

`

const DELETE_CATEGORY = `

`

const getCategory = () => fetch(CATEGORIES)

export default {
    getCategory
}