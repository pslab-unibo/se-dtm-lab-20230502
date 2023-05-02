/**
 * Model Proxy 
 * 
 * This is running on client side, interacting with the service 
 * -- "proxy" = exposing an interface similar to the service one.
 * 
 */
class CalculatorProxy {
    
    constructor(){   
    }

    async clear(){
        console.log("proxy: clear requested");
        fetch('/api/clear', {
            method: 'POST',
        })
   }

    async addDigit(digit){
        console.log("proxy: addDigit requested");
        await fetch('/api/add-digit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                { "digit": digit }
            )
        })   
    }

    async addDecimalPoint(){
        await fetch('/api/add-decimal-point', {
            method: 'POST'
        })   
      }

    async removeLastDigit(){
        await fetch('/api/remove-last-digit', {
            method: 'POST'
        })   
    }

    async setOperator(op){
        await fetch('/api/set-operator', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                { "operator": op }
            )
        })   
    }

    async computeResult(){
        await fetch('/api/compute-result', {
            method: 'POST'
        })   
    }

    async getCurrentOperandValue(){
        console.log("proxy: get current operand requested");
        const response = await fetch("/api/current-operand");
        const result = await response.json();
        return result.operand;     
    }

    async getCurrentOperator(){
        console.log("proxy: get current operator requested");
        const response = await fetch("/api/current-operator");
        const result = await response.json();
        return result.operator;     
    }

    async getCurrentResult(){
        console.log("proxy: get current result requested");
        const response = await fetch("/api/current-result");
        const res = await response.json();
        return res.result;     
    }
}


let calc = new CalculatorProxy();

exports.getCalcModel = function () {
	return calc;
}
