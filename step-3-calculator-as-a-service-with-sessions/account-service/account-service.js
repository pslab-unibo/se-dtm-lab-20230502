// Load express
const express  = require("express");
const app = express()
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json()); 

const axios = require("axios");

var model = require('./account-model');

console.log(model);

app.get("/", (req, res) => {
	res.send("This is the account service.")
})

app.get("/api/accounts",async (req, res) => {
	res.send(model.getAccountModel().getAllAccountsId())
})

app.get("/api/accounts/:uid",async (req, res) => {
	try {
		user = model.getAccountModel().getAccountById(req.params.uid)
		res.send(JSON.stringify(user))
	} catch (e){
		res.sendStatus(404)
	}
})

// Register new account

app.post("/api/accounts", async (req, res) => {
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

// APP listening on port 5061

app.listen(5061, () => {
	console.log("Account service up and running.")
})

