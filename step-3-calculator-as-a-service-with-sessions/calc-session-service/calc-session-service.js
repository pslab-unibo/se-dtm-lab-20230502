/**
 * Calculators Service
 * 
 * This is a Web Service providing a REST API to manage calculator sessions.
 * 
 */

/* Loading and configuring Express framework */

const express  = require('express');
const service = express()
const bodyParser = require('body-parser');
service.use(bodyParser.urlencoded({extended: true})); 
service.use(bodyParser.json()); 
service.use(express.static('public'));

/* importing the model module */

var model = require('./calc-session-model');

/* service port */

const CALC_SERVICE_PORT = 5062

/* Defining the handlers for the REST API (HTTP requests) */

/**
 *  Get Information about the service.
 * 
 *  GET / 
 */
service.get('/', (req, res) => {
	res.send('This is the calc service.')
})

/**
 * Create a new calc session
 * 
 * POST /api/sessions
 * 
 * message in: a JSON with the user Id
 * message out: a JSON with the session Id
 * 
 */
service.post('/api/sessions', async (req, res) => {
	console.log('New request: create new session ');
	const userId = req.body.userId;
	console.log('User id: ' + userId);
	const sessionId = model.getSessionManager().createNewSession(userId);
	res.send(JSON.stringify(
		{ 'sessionId': sessionId }
	));
})

/**
 * Clear command -- for a calculator of a specific session 
 * 
 * POST '/api/sessions/:sid/clear'
 */
service.post('/api/sessions/:sid/clear', async (req, res) => {
	const sessionId = req.params.sid;
	console.log('New request in session ' + sessionId + ':');
	console.log('Clear');
	const calc = model.getSessionManager().getCalc(sessionId);
	calc.clear();
	res.sendStatus(200);	
})

/**
 * Add-digit command -- for a calculator of a specific session 
 * 
 * POST '/api/sessions/:sid/add-digit'
 * 
 * message in: a JSON with the digit
 * 
 */
service.post('/api/sessions/:sid/add-digit', async (req, res) => {
	try {
		const sessionId = req.params.sid;
		console.log('New request in session ' + sessionId + ':');
		console.log('add-digit ' + JSON.stringify(req.body))
		const calc = model.getSessionManager().getCalc(sessionId);
		calc.addDigit(req.body.digit);
		res.sendStatus(200);
	} catch (err){
		res.sendStatus(400);
	}	
})

/**
 * set-operator command -- for a calculator of a specific session 
 * 
 * POST '/api/sessions/:sid/set-operator'
 * 
 * message in: a JSON with the operator
 * 
 */
service.post('/api/sessions/:sid/set-operator', async (req, res) => {
	try {
		const sessionId = req.params.sid;
		console.log('New request in session ' + sessionId + ':');
		console.log('set-operator ' + JSON.stringify(req.body))
		const calc = model.getSessionManager().getCalc(sessionId);
		calc.setOperator(req.body.operator);
		res.sendStatus(200);
	} catch (err){
		res.sendStatus(400);
	}	
})

/**
 * compute-result command -- for a calculator of a specific session 
 * 
 * POST '/api/sessions/:sid/compute-result'
 * 
 */
service.post('/api/sessions/:sid/compute-result', async (req, res) => {
	try {
		const sessionId = req.params.sid;
		console.log('New request in session ' + sessionId + ':');
		console.log('compute-result ')
		const calc = model.getSessionManager().getCalc(sessionId);
		calc.computeResult();
        res.sendStatus(200);
	} catch (err){
		res.sendStatus(400);
	}	
})

/**
 * Query current-result -- for a calculator of a specific session 
 * 
 * GET '/api/sessions/:sid/current-result'
 * 
 * message out: a JSON with current result
 * 
 */
service.get('/api/sessions/:sid/current-result',async (req, res) => {
	try {
		const sessionId = req.params.sid;
		console.log('New request in session ' + sessionId + ':');
		console.log('GET current-result')
		const calc = model.getSessionManager().getCalc(sessionId);
		const result = calc.getCurrentResult();
        res.send(JSON.stringify({ 'result': result }))
	} catch (e){
		res.sendStatus(404)
	}
})

/**
 * Query current-operand -- for a calculator of a specific session 
 * 
 * GET '/api/sessions/:sid/current-operand'
 * 
 * message out: a JSON with current operand
 * 
 */
service.get('/api/sessions/:sid/current-operand',async (req, res) => {
	try {
		const sessionId = req.params.sid;
		console.log('New request in session ' + sessionId + ':');
		console.log('GET current-operand')
		const calc = model.getSessionManager().getCalc(sessionId);
		const operand = calc.getCurrentOperandValue()
		res.send(JSON.stringify({ 'operand': operand }))
	} catch (e){
		res.sendStatus(404)
	}
})


/* Deploying the service on the specified port */

service.listen(CALC_SERVICE_PORT, () => {
	console.log('Calc service up and running (port ' + CALC_SERVICE_PORT + ')')
})


