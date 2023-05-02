class Account {

	constructor(id, name) {
		this.id = id;
		this.name = name;
	}

	getId(){
		return this.id;
	}

	getName(){
		return this.name;
	}
}


class Accounts {

	accounts;
	accountsCount;
	
	constructor() {
      this.accounts = new Map()
	  this.accountsCount = 0;
	}

	registerNewUser(name){
		console.log("Registering new user: " + name);
		this.accountsCount++;
		const userId = "user-"  + this.accountsCount;
		this.accounts.set(userId, new Account(userId, name));
		return userId;
	}
}

let accounts = new Accounts()

exports.getAccountModel = function () {
	return accounts;
};
  