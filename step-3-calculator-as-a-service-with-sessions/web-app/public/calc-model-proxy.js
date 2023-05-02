/* Model Proxy */

class CalculatorProxy {
    
    path;

    constructor(){   
        this.path = '/api'
    }

    setSessionId(sessionId){
        this.path = this.path + "/sessions/" + sessionId;
    }

    clear(){
        console.log("proxy: clear requested");
        fetch(this.path + '/clear', {
            method: 'POST',
        })
   }

    addDigit(digit){
        console.log("proxy: addDigit requested");
        let promise = fetch(this.path +'/add-digit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                { "digit": digit }
            )
        })   
        return promise; 
    }

    addDecimalPoint(){
        let promise = fetch(this.path + '/add-decimal-point', {
            method: 'POST'
        })   
        return promise;     
      }

    removeLastDigit(){
        let promise = fetch(this.path + '/remove-last-digit', {
            method: 'POST'
        })   
        return promise;     
    }

    setOperator(op){
        let promise = fetch(this.path + '/set-operator', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                { "operator": op }
            )
        })   
        return promise;     
    }

    computeResult(){
        let promise = fetch(this.path + '/compute-result', {
            method: 'POST'
        })   
        return promise;     
    }

    async getCurrentOperandValue(){
        console.log("proxy: get current operand requested");
        const response = await fetch(this.path + '/current-operand');
        console.log("response: " + response);
        const result = await response.json();
        console.log("resukt: " + result);        
        return result.operand;     
    }

    async getCurrentOperator(){
        console.log("proxy: get current operator requested");
        const response = await fetch(this.path + "/current-operator");
        const result = await response.json();
        return result.operator;     
    }

    async getCurrentResult(){
        console.log("proxy: get current result requested");
        const response = await fetch(this.path + '/current-result');
        const res = await response.json();
        return res.result;     
    }
}

let calc = new CalculatorProxy();
