
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
        console.log("add decimal point");
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

function testCalc(){
    console.log("Testing a calculator");
    let calc = new Calculator();
    console.log("Inserting digits for the first operand...");
    calc.addDigit(1);
    calc.addDigit(5);
    console.log("First Operand: " + calc.getCurrentOperandValue());
    console.log("Setting operator..");
    calc.setOperator('*');
    console.log("Current operator: " + calc.getCurrentOperator());
    console.log("Inserting digits for the second operand...");
    calc.addDigit(2);
    calc.addDigit(9);
    console.log("Second Operand: " + calc.getCurrentOperandValue());
    calc.computeResult();    
    console.log("Compute result: " + calc.getCurrentResult());
}

let calc = new Calculator();

exports.getCalc = function () {
	return calc;
};
