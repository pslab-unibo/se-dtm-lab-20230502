
/* Model */

class Calculator {
    
    firstOperand;
    secondOperand;
    operator;
    result;
    
    insertingFirstOperand;
    insertingSecondOperand;
    
    insertingDecimals;
    decimalPosition;

    constructor(){   
        this.clear();
    }

    clear(){
        this.insertingFirstOperand = true;
        this.insertingSecondOperand = false; 
        this.insertingDecimals = 0;
        this.firstOperand = 0;
        this.secondOperand = 0;
        this.operator = '';    
    }

    addDigit(digit){
        if (this.insertingFirstOperand){
            if (!this.insertingDecimals){
              this.firstOperand = this.firstOperand*10 + digit;
            } else {
                let v = digit;
                for (let i = 0; i < this.decimalPosition; i++){
                    v = v / 10;
                }
                this.firstOperand = this.firstOperand + v;
                this.decimalPosition++;
            }
        } else if (this.insertingSecondOperand){
            if (!this.insertingDecimals){
                this.secondOperand = this.secondOperand*10 + digit;
            } else {
                let v = digit;
                for (let i = 0; i < this.decimalPosition; i++){
                    v = v / 10;
                }
                this.secondOperand = this.secondOperand + v;
                this.decimalPosition++;

            }
        }
    }

    addDecimalPoint(){
        this.insertingDecimals = true;
        this.decimalPosition = 1; 
        console.log('add decimal point');
    }

    removeLastDigit(){
        if (this.insertingFirstOperand){
            this.firstOperand = Math.trunc(this.firstOperand/10);
        } else if (this.insertingSecondOperand){
            this.secondOperand = Math.trunc(this.secondOperand/10);
        }
    }

    setOperator(op){
        this.operator = op;
        this.insertingFirstOperand = false;
        this.insertingSecondOperand = true;
        this.insertingDecimals = false;
    }

    computeResult(){
        if (this.operator == '+'){
            this.result = this.firstOperand + this.secondOperand;
        } else if (this.operator == '-'){
            this.result = this.firstOperand - this.secondOperand;
        } else if (this.operator == '*'){
            this.result = this.firstOperand * this.secondOperand;
        } else if (this.operator == '/'){
            this.result = this.firstOperand / this.secondOperand;
        } 
        this.firstOperand = this.result;
    }

    getCurrentOperandValue(){
        if (this.insertingFirstOperand){
            return this.firstOperand;
        } else {
            return this.secondOperand;
        }
    }

    getCurrentOperator(){
        return this.operator;
    }

    getCurrentResult(){
        return this.result;
    }
}

class Session {
    sessionId;
    userId;
    calculator;

    constructor(sessionId, userId, calc){
        this.sessionId = sessionId;
        this.userId = userId;
        this.calculator = calc;
    }    

    getCalc(){
        return this.calculator;
    }
}

class SessionManager {
    
    constructor() {
        this.sessions = new Map();
        this.sessionCount = 0;
    }
  
    createNewSession(userId){
        this.sessionCount++;
        const sessionId = 'session-' + this.sessionCount; 
        const calc = new Calculator();          
        const newSession = new Session(sessionId, userId, calc);
        this.sessions.set(sessionId, newSession);
        console.log('New session created: '+ sessionId + ' for user ' + userId);
        return sessionId;
    }

    getCalc(sessionId){
        const session = this.sessions.get(sessionId);
        return session.getCalc();
    }

}

let sessionManager = new SessionManager();

exports.getSessionManager = function () {
	return sessionManager;
};
