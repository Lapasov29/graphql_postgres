import fetch from '../../utils/postgres.js'

const USERS = `
    SELECT 
        *
    FROM users
    WHERE role <> 1 AND
	CASE
		WHEN $1 > 0 THEN user_id = $1
		ELSE TRUE
	END AND
	CASE
		WHEN LENGTH($2) > 0 THEN (
			username ILIKE CONCAT('%', $2, '%') OR
			email ILIKE CONCAT('%', $2, '%')
		) ELSE TRUE
	END
    ORDER BY user_id
`

const ADD_USERS = `
INSERT INTO users (username, password, contact, email) VALUES 
($1, crypt($2, gen_salt('bf')), $3, $4)
returning user_id, username, contact, email, role
`

const CHANGE_USERS = `
UPDATE users u SET
    username = (
        CASE WHEN LENGTH($2) > 0 THEN $2 ELSE u.username END
    ),
    password = (
        CASE WHEN LENGTH($3) > 0 THEN crypt($3, gen_salt('bf')) ELSE u.password END
    ),
    contact = (
        CASE WHEN LENGTH($4) > 0 THEN $4 ELSE u.contact END
    ),
    email = (
        CASE WHEN LENGTH($5) > 0 THEN $5 ELSE u.email END
    )
WHERE user_id = $1
RETURNING *
`

const DELETE_USERS = `
    DELETE FROM users
	WHERE user_id = $1
	RETURNING *
`

const getUsers = ({user_id, search}) => fetch(USERS, user_id, search)
const addUser = ({username, password, contact, email}) => fetch(ADD_USERS, username, password, contact, email)
const updateUser = ({user_id, username, password, contact, email}) => fetch(CHANGE_USERS, user_id, username, password, contact, email)
const deleteUser = ({user_id}) => fetch(DELETE_USERS, user_id)

export default {
    getUsers,
    addUser,
    updateUser,
    deleteUser
}