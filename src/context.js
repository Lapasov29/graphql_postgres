import queryParser from './helpers/queryParser.js'
import jwt from 'jsonwebtoken'

export default function ({ req, res }) {
	// console.log(1, req.body)
	const { operation, fieldName, variables } = queryParser(req.body)
	if(fieldName == '__schema') return 

	if(fieldName == 'login' || fieldName == 'register') return req.headers
	let userQueries = ['addOrder', 'orders', 'updateOrder', 'deleteOrder']
	let adminQueries = ['addCategory', 'updateCategory', 'deleteCategory', 'addProduct', 'updateProduct', 'deleteProduct', 'orders']
	const Token = req.headers.token
	const reqAgent = req.header['user-agent']

	//public roads
	if(!Token) throw new Error('token is required')
	
	const { user_id, role, agent } = jwt.verify(Token, process.env.TOKEN_KEY)
	
	if(reqAgent != agent) throw new Error('Token is sent from wrong device!')

	// return
}
