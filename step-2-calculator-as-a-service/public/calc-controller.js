/* Controller */

async function notifyClearRequested(){
    await calc.clear();
    view.update('');
}

async function notifyNewDigitInserted(digit) {
    await calc.addDigit(digit);
    view.update(await calc.getCurrentOperandValue());
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