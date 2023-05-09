/**
 * This service is the Web App entry point,
 * functioning as an API Gateway.
 */

/* Loading and configuring Express framework */

const express  = require('express');
const path = require('path');
const service = express()
const bodyParser = require('body-parser');
service.use(bodyParser.urlencoded({extended: true})); 
service.use(bodyParser.json()); 
service.use(express.static('public'));
const axios = require('axios');

const APP_SERVICE_PORT = 5070
const CALC_SERVICE_API_BASE_ADDR = 'http://localhost:5062/api';
const ACCOUNT_SERVICE_API_BASE_ADDR = 'http://localhost:5061/api';

/**
 * Getting the Web App Main page.
 */
service.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/index.html'));
})

/* CONFIGURING the handlers for the REST API (HTTP requests) */

/* Requests for the Account service */

service.post('/api/register', async (req, res) => {
	try {
		console.log('POST register: ' + JSON.stringify(req.body))
		const name = req.body.name;		
		const payload = { 
			'name': name 
		}
		const response = await axios.post(ACCOUNT_SERVICE_API_BASE_ADDR + '/accounts',payload);
		const userId = response.data.userId;
		console.log('New user registered: ' + userId);
		res.send(JSON.stringify({
			'userId': userId
		}));
	} catch (err){
		res.sendStatus(400);
	}	
})

/* Requests for the Calc service */

service.post('/api/login', async (req, res) => {
	try {
		console.log('POST login: ' + JSON.stringify(req.body))
		const userId = req.body.userId;		
		const payload = { 
			'userId': userId 
		}
		const response = await axios.post(CALC_SERVICE_API_BASE_ADDR + '/sessions',payload);
		const sessionId = response.data.sessionId;
		console.log('User logged in - new session created: ' + sessionId);
		res.send(JSON.stringify({
			'sessionId': sessionId
		}));
	} catch (err){
		res.sendStatus(400);
	}	
})

service.post('/api/sessions/:sid/clear', async (req, res) => {
	console.log('API GATEWAY: bridging clear');
	await axios.post(CALC_SERVICE_API_BASE_ADDR + '/sessions/' + req.params.sid + '/clear');
	res.sendStatus(200);	
})

service.post('/api/sessions/:sid/add-digit', async (req, res) => {
	console.log('API GATEWAY: bridging POST add-digit');
	try {
		await axios.post(CALC_SERVICE_API_BASE_ADDR + '/sessions/' + req.params.sid + '/add-digit',req.body);
		res.sendStatus(200);
	} catch (err){
		res.sendStatus(400);
	}	
})

service.post('/api/sessions/:sid/set-operator', async (req, res) => {
	console.log('API GATEWAY: bridging POST set-operator');
	try {
		await axios.post(CALC_SERVICE_API_BASE_ADDR + '/sessions/' + req.params.sid + '/set-operator',req.body);
		res.sendStatus(200);
	} catch (err){
		res.sendStatus(400);
	}	
})

service.post('/api/sessions/:sid/compute-result', async (req, res) => {
	console.log('API GATEWAY: bridging POST compute-result');
	try {
		await axios.post(CALC_SERVICE_API_BASE_ADDR + '/sessions/' + req.params.sid + '/compute-result');
		res.sendStatus(200);
	} catch (err){
		res.sendStatus(400);
	}	
})

service.get('/api/sessions/:sid/current-result',async (req, res) => {
	console.log('API GATEWAY: bridging GET current-result');
	try {
		const response = await axios.get(CALC_SERVICE_API_BASE_ADDR + '/sessions/' + req.params.sid + '/current-result');
        res.send(JSON.stringify(response.data));
	} catch (e){
		res.sendStatus(404)
	}
})

service.get('/api/sessions/:sid/current-operand',async (req, res) => {
	console.log('API GATEWAY: bridging GET current-operand');
	try {
		const response = await axios.get(CALC_SERVICE_API_BASE_ADDR + '/sessions/' + req.params.sid + '/current-operand');
		console.log('current operand: ' + response.data.operand);
        res.send(JSON.stringify(response.data));
	} catch (e){		
		res.sendStatus(404)
	}
})


/* Deploying the service on the specified port */

service.listen(APP_SERVICE_PORT, () => {
	console.log('Web App service up and running (port ' + APP_SERVICE_PORT + ')')
})


