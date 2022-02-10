import queryParser from './helpers/queryParser.js'
import jwt from 'jsonwebtoken'

export default function ({ req, res }) {
	// console.log(1, req.body)
	const { operation, fieldName, variables } = queryParser(req.body)
	if(fieldName == '__schema') return 

	//public routes
	if(fieldName == 'login' || fieldName == 'register') return req.headers

	const Token = req.headers.token
	const reqAgent = req.headers['user-agent']
	
	let userQueries = ['addOrder', 'updateOrder', 'deleteOrder', 'updateUser', 'deleteUser']
	let adminQueries = ['addCategory', 'updateCategory', 'deleteCategory', 'addProduct', 'updateProduct', 'deleteProduct', 'orders']
	
	// private routes
	if(!Token) throw new Error('token is required')
	
	const { user_id, role, agent } = jwt.verify(Token, process.env.TOKEN_KEY)
	if(reqAgent != agent) throw new Error('Token is sent from wrong device!')

	// authorized user's routes
	console.log(5, fieldName);
	if(userQueries.includes(fieldName)){
		if(role != 2) throw new Error("Permission denied!")
		console.log(user_id, role);
		return { user_id }
	}
	// authorized stuff's routes
	if(adminQueries.includes(fieldName)){
		if(role != 1) throw new Error("Permission denied!")
		return { user_id }
	}
	// return
}
