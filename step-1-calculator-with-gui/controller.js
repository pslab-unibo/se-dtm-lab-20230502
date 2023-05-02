/* Controller */

function notifyNewDigitInserted(digit) {
    calc.addDigit(digit);
    view.update(calc.getCurrentOperandValue());
}

function notifyOperatorSelected(op) {
    calc.setOperator(op);
}

function notifyLastDigitRemoveRequested(){
    calc.removeLastDigit();
    view.update(calc.getCurrentOperandValue());
}

function notifyClearRequested(){
    calc.clear();
    view.update('');
}

function notifyComputeResultRequested(){
    calc.computeResult();
    view.update(calc.getCurrentResult());
}

function notifyDecimalPointInserted(){
    calc.addDecimalPoint();
}