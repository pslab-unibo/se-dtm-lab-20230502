/**
 * Calculator as a Web Service - exposing a REST API (based on HTTP)
 * 
 */

/* Loading and configuring Express framework */

const express  = require('express');
const path = require('path');
const service = express();
const bodyParser = require('body-parser');
service.use(bodyParser.urlencoded({extended: true}));
service.use(bodyParser.json());
service.use(express.static('public'));

/* importing the model module */

var model = require('./calc-model')

const CALC_SERVICE_PORT = 5050

/**
 * Specifying the handler for the HTTP request: GET /
 */
service.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/index.html'));
})

/**
 * Specifying the handler for the HTTP request: POST /api/clear
 */
service.post('/api/clear', async (req, res) => {
	console.log('New request: clear');
	model.getCalc().clear();
	res.sendStatus(200);	/* HTTP code meaning: OK */
})

/**
 * Specifying the handler for the HTTP request: POST /api/add-digit
 */
service.post('/api/add-digit', async (req, res) => {
	try {
		console.log('New request: add-digit ' + JSON.stringify(req.body));
		model.getCalc().addDigit(req.body.digit);
		res.sendStatus(200);
	} catch (err){
		res.sendStatus(400); /* One of the HTTP code meaning ERROR */
	}	
})

/**
 * Specifying the handler for the HTTP request: POST /api/set-operator
 */
service.post('/api/set-operator', async (req, res) => {
	try {
		console.log('New request: set-operator ' + JSON.stringify(req.body));
		model.getCalc().setOperator(req.body.operator);
		res.sendStatus(200);
	} catch (err){
		res.sendStatus(400);
	}	
})

/**
 * Specifying the handler for the HTTP request: POST /api/compute-result
 */
service.post('/api/compute-result', async (req, res) => {
	try {
		console.log('New request: compute-result ');
		model.getCalc().computeResult();
        res.sendStatus(200);
	} catch (err){
		res.sendStatus(400);
	}	
})

/**
 * Specifying the handler for the HTTP request: POST /api/add-decimal-point
 */
service.post('/api/add-decimal-point', async (req, res) => {
	try {
		console.log('New request: add-decimal-point ');
		model.getCalc().addDecimalPoint();
        res.sendStatus(200);
	} catch (err){
		res.sendStatus(400);
	}	
})

/**
 * Specifying the handler for the HTTP request: POST /api/remove-last-digit
 */
service.post('/api/remove-last-digit', async (req, res) => {
	try {
		console.log('New request: add-decimal-point ');
		model.getCalc().removeLastDigit();
        res.sendStatus(200);
	} catch (err){
		res.sendStatus(400);
	}	
})


/**
 * Specifying the handler for the HTTP request: GET /api/current-result
 */
service.get('/api/current-result',async (req, res) => {
	try {
		console.log('New request: compute-operand ');
		let result = model.getCalc().getCurrentResult();
        res.send(JSON.stringify({ 'result': result }));
	} catch (e){
		res.sendStatus(404);
	}
})

/**
 * Specifying the handler for the HTTP request: GET /api/current-operand
 */
service.get('/api/current-operand',async (req, res) => {
	try {
		console.log('New request: GET current-operand');
		let operand = model.getCalc().getCurrentOperandValue();
        res.send(JSON.stringify({ 'operand': operand }));
	} catch (e){
		res.sendStatus(404);
	}
})

/**
 * Configure the service to listen on port 5050
 */
service.listen(CALC_SERVICE_PORT, () => {
	console.log('Calculator service up and running on port ' + CALC_SERVICE_PORT);
});


