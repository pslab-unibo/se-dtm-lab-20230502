const express  = require("express");
const path = require('path');
const service = express()

const bodyParser = require("body-parser");
service.use(bodyParser.urlencoded({extended: true})); 
service.use(bodyParser.json()); 
service.use(express.static('public'));

const axios = require("axios");

service.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, '/index.html'));
})

service.post('/api/register', async (req, res) => {
	try {
		console.log('POST register: ' + JSON.stringify(req.body))
		const name = req.body.name;		
		const payload = { 
			'name': name 
		}
		const response = await axios.post('http://localhost:5061/api/accounts',payload);
		const userId = response.data.userId;
		console.log('New user registered: ' + userId);
		res.send(JSON.stringify({
			'userId': userId
		}));
	} catch (err){
		res.sendStatus(400);
	}	
})

service.post('/api/login', async (req, res) => {
	try {
		console.log('POST login: ' + JSON.stringify(req.body))
		const userId = req.body.userId;		
		const payload = { 
			'userId': userId 
		}
		const response = await axios.post('http://localhost:5062/api/sessions',payload);
		const sessionId = response.data.sessionId;
		console.log('User logged in - new session created: ' + sessionId);
		res.send(JSON.stringify({
			'sessionId': sessionId
		}));
	} catch (err){
		res.sendStatus(400);
	}	
})

/* ---- */

service.post("/api/sessions/:sid/clear", async (req, res) => {
	console.log("API GATEWAY: bridging clear");
	await axios.post('http://localhost:5062/api/sessions/' + req.params.sid + '/clear');
	res.sendStatus(200);	
})

service.post("/api/sessions/:sid/add-digit", async (req, res) => {
	console.log("API GATEWAY: bridging POST add-digit");
	try {
		await axios.post('http://localhost:5062/api/sessions/' + req.params.sid + '/add-digit',req.body);
		res.sendStatus(200);
	} catch (err){
		res.sendStatus(400);
	}	
})

service.post("/api/sessions/:sid/set-operator", async (req, res) => {
	console.log("API GATEWAY: bridging POST set-operator");
	try {
		await axios.post('http://localhost:5062/api/sessions/' + req.params.sid + '/set-operator',req.body);
		res.sendStatus(200);
	} catch (err){
		res.sendStatus(400);
	}	
})

service.post("/api/sessions/:sid/compute-result", async (req, res) => {
	console.log("API GATEWAY: bridging POST compute-result");
	try {
		await axios.post('http://localhost:5062/api/sessions/' + req.params.sid + '/compute-result');
		res.sendStatus(200);
	} catch (err){
		res.sendStatus(400);
	}	
})

service.get("/api/sessions/:sid/current-result",async (req, res) => {
	console.log("API GATEWAY: bridging GET current-result");
	try {
		const response = await axios.get('http://localhost:5062/api/sessions/' + req.params.sid + '/current-result');
        res.send(JSON.stringify(response.data));
	} catch (e){
		res.sendStatus(404)
	}
})

service.get("/api/sessions/:sid/current-operand",async (req, res) => {
	console.log("API GATEWAY: bridging GET current-operand");
	try {
		const response = await axios.get('http://localhost:5062/api/sessions/' + req.params.sid + '/current-operand');
		console.log("current operand: " + response.data.operand);
        res.send(JSON.stringify(response.data));
	} catch (e){		
		res.sendStatus(404)
	}
})


// Service for the web app - listening on port 5070

service.listen(5070, () => {
	console.log('Web App Calc Service up and running on port 5070.')
})


