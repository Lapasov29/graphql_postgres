import queryParser from './helpers/queryParser.js'
import jwt from 'jsonwebtoken'

export default function ({ req, res }) {

	// for queries with variables
	if(Object.keys(req.body.variables).length){
		const Token = req.headers.token
		const reqAgent = req.headers['user-agent']
		if(!Token) throw new Error('token is required')
	
		const { user_id, role, agent } = jwt.verify(Token, process.env.TOKEN_KEY)
		if(reqAgent != agent) throw new Error('Token is sent from wrong device!')
		if(role != 1) throw new Error("Permission denied!")
		return { user_id }
	}

	const { operation, fieldName, variables } = queryParser(req.body)
	if(fieldName == '__schema') return 

	//public routes
	if(fieldName == 'login' || fieldName == 'register') return req.headers

	const Token = req.headers.token
	const reqAgent = req.headers['user-agent']
	
	let userQueries = ['addOrder', 'updateOrder', 'deleteOrder', 'updateUser', 'deleteUser', 'orders', 'users']
	let adminQueries = ['addCategory', 'updateCategory', 'deleteCategory', 'addProduct', 'updateProduct', 'deleteProduct', 'orders', 'users']
	
	// private routes
	if(!Token) throw new Error('token is required')
	
	const { user_id, role, agent } = jwt.verify(Token, process.env.TOKEN_KEY)

	if(reqAgent != agent) throw new Error('Token is sent from wrong device!')

	// authorized user's routes
	if(userQueries.includes(fieldName)){
		if(role != 2 && role != 1) throw new Error("Permission denied!")
		return { user_id, role }
	}

	// authorized stuff's routes
	if(adminQueries.includes(fieldName)){
		if(role != 1) throw new Error("Permission denied!")
		return { user_id, role }
	}
}
