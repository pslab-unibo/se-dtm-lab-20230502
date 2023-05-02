// Load express

const express  = require("express");
const path = require('path');
const service = express()
const bodyParser = require("body-parser");
service.use(bodyParser.urlencoded({extended: true})); 
service.use(bodyParser.json()); 
service.use(express.static('public'));
const axios = require("axios");

var model = require('./calc-session-model');

console.log(model);

service.get('/api/sessions/:sid', (req, res) => {
	console.log("CALC SESSION ACCESS");
	const options = {
        root: path.join(__dirname)
		// headers: ...
    };
	res.sendFile('/index.html', options);
});


service.post('/api/sessions', async (req, res) => {
	console.log('New request: create new session ');
	const userId = req.body.userId;
	console.log('User id: ' + userId);
	const sessionId = model.getSessionManager().createNewSession(userId);
	res.send(JSON.stringify(
		{ 'sessionId': sessionId }
	));
})

service.post("/api/sessions/:sid/clear", async (req, res) => {
	const sessionId = req.params.sid;
	console.log("New request in session " + sessionId + ":");
	console.log("Clear");
	const calc = model.getSessionManager().getCalc(sessionId);
	calc.clear();
	res.sendStatus(200);	
})

service.post("/api/sessions/:sid/add-digit", async (req, res) => {
	try {
		const sessionId = req.params.sid;
		console.log("New request in session " + sessionId + ":");
		console.log("add-digit " + JSON.stringify(req.body))
		const calc = model.getSessionManager().getCalc(sessionId);
		calc.addDigit(req.body.digit);
		res.sendStatus(200);
	} catch (err){
		res.sendStatus(400);
	}	
})

service.post("/api/sessions/:sid/set-operator", async (req, res) => {
	try {
		const sessionId = req.params.sid;
		console.log("New request in session " + sessionId + ":");
		console.log("set-operator " + JSON.stringify(req.body))
		const calc = model.getSessionManager().getCalc(sessionId);
		calc.setOperator(req.body.operator);
		res.sendStatus(200);
	} catch (err){
		res.sendStatus(400);
	}	
})

service.post("/api/sessions/:sid/compute-result", async (req, res) => {
	try {
		const sessionId = req.params.sid;
		console.log("New request in session " + sessionId + ":");
		console.log("compute-result ")
		const calc = model.getSessionManager().getCalc(sessionId);
		calc.computeResult();
        res.sendStatus(200);
	} catch (err){
		res.sendStatus(400);
	}	
})

service.get("/api/sessions/:sid/current-result",async (req, res) => {
	try {
		const sessionId = req.params.sid;
		console.log("New request in session " + sessionId + ":");
		console.log("GET current-result")
		const calc = model.getSessionManager().getCalc(sessionId);
		const result = calc.getCurrentResult();
        res.send(JSON.stringify({ 'result': result }))
	} catch (e){
		res.sendStatus(404)
	}
})

service.get("/api/sessions/:sid/current-operand",async (req, res) => {
	try {
		const sessionId = req.params.sid;
		console.log("New request in session " + sessionId + ":");
		console.log("GET current-operand")
		const calc = model.getSessionManager().getCalc(sessionId);
		const operand = calc.getCurrentOperandValue()
		res.send(JSON.stringify({ 'operand': operand }))
	} catch (e){
		res.sendStatus(404)
	}
})


// Service listening on port 5062

service.listen(5062, () => {
	console.log("Calculator session service up and running on port 5050");
})


