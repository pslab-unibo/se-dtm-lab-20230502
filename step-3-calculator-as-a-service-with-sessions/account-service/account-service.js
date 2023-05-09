/**
 * Account Service
 * 
 * This is a Web Service providing a REST API to manage accounts.
 * 
 */


/* Loading and configuring Express framework */

const express  = require("express");
const service = express()
const bodyParser = require("body-parser");
service.use(bodyParser.urlencoded({extended: true})); 
service.use(bodyParser.json()); 

/* importing the model module */

const model = require('./account-model');

/* service port */

const ACCOUNT_SERVICE_PORT = 5061

/* CONFIGURING the handlers for the REST API (HTTP requests) */

/**
 *  GET /
 *  Information about the service. 
 */
service.get('/', (req, res) => {
	res.send('This is the account service.')
})

/**
 * Get the list of the identifiers of registered accounts.
 * 
 * GET /api/accounts
 */
service.get('/api/accounts',async (req, res) => {
	res.send(JSON.stringify(model.getAccountModel().getAllAccountsId()))
})

/**
 * Get information about a specific account, given its id.
 * 
 * GET /api/accounts/<id>
 * 
 * message out: a JSON with user info
 */
service.get('/api/accounts/:uid',async (req, res) => {
	try {
		console.log('GET info about account : ' + req.params.uid)
		user = model.getAccountModel().getAccountById(req.params.uid)
		res.send(JSON.stringify(user))
	} catch (e){
		/* error */
		res.sendStatus(404)
	}
})

/**
 * Register a new a account, returning its id
 * 
 * POST /api/accounts
 * 
 * message in: a JSON with account info
 * message out: a JSON with the Id
 */
service.post('/api/accounts', async (req, res) => {
	try {
		console.log('POST new account: ' + JSON.stringify(req.body))
		const name = req.body.name;
		const userId = model.getAccountModel().registerNewUser(name)
		console.log('New account created for ' + name + ': ' + userId)
		res.send(JSON.stringify({
			'userId': userId
		}));
	} catch (err){
		res.sendStatus(400);
	}	
})

/* Deploying the service on the specified port */

service.listen(ACCOUNT_SERVICE_PORT, () => {
	console.log('Account service up and running (port ' + ACCOUNT_SERVICE_PORT + ')')
})

