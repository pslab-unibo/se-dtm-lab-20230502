/* Controller */

async function notifySubmitRegister(name){
    console.log('submit register');
    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            { 'name': name }
        )
    })
    
    const result = await response.json()
    view.showUserId(result.userId)
}

async function notifySubmitLogin(userId) {
    console.log("submit login: user id is " + userId);
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            { 'userId': userId }
        )
    })
    const result = await response.json()
    calc.setSessionId(result.sessionId)
    view.hideLogin()
    view.hideRegistration()
    view.showCalculator(userId)
}

async function notifyClearRequested(){
    await calc.clear();
    view.update('');
}

async function notifyNewDigitInserted(digit) {
    await calc.addDigit(digit);
    const operand = await calc.getCurrentOperandValue()
    view.update(operand);
}

async function notifyOperatorSelected(op) {
    await calc.setOperator(op);
}

async function notifyLastDigitRemoveRequested(){
    calc.removeLastDigit();
    view.update(await calc.getCurrentOperandValue());
}


async function notifyComputeResultRequested(){
    await calc.computeResult();
    view.update(await calc.getCurrentResult());
}

async function notifyDecimalPointInserted(){
    await calc.addDecimalPoint();
}
