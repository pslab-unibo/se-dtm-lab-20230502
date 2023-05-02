/* 
 * Interactive Calculator as an object, as a simple 
 * domain model perspective
 * 
 */
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

    /** 
     * 
     * Clear the  state. Set the current operand 
     * to be first operand.
     * 
     */
    clear(){
        this.insertingFirstOperand = true;
        this.insertingSecondOperand = false; 
        this.insertingDecimals = 0;
        this.firstOperand = 0;
        this.secondOperand = 0;
        this.operator = '';    
    }

    /**
     * 
     * Add a digit to the current operand.
     *   
     * @param {Number} digit 
     */
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

    /** 
     *
     * Add a decimal point to current operand, so that next digits
     * are used for the decimal part.
     *
     */
    addDecimalPoint(){
        this.insertingDecimals = true;
        this.decimalPosition = 1; 
        console.log("add decimal point");
    }

    /**
     * 
     * Remove the last digit inserted in current operand.
     */
    removeLastDigit(){
        if (this.insertingFirstOperand){
            this.firstOperand = Math.trunc(this.firstOperand/10);
        } else if (this.insertingSecondOperand){
            this.secondOperand = Math.trunc(this.secondOperand/10);
        }
    }

    /**
     * 
     * Set the current operator of the operation,
     * and switch to second operand as current operand.
     * 
     * @param {String} op 
     */
    setOperator(op){
        this.operator = op;
        this.insertingFirstOperand = false;
        this.insertingSecondOperand = true;
        this.insertingDecimals = false;
    }

    /**
     * 
     * Compute the result by applying the current operator
     * to the current operands. The result is saved as first operand.
     * 
     */
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

    /**
     * 
     * Get current operand.
     * @returns a number representing the current operand.
     * 
     */
    getCurrentOperandValue(){
        if (this.insertingFirstOperand){
            return this.firstOperand;
        } else {
            return this.secondOperand;
        }
    }

    /**
     * Get the current operator.
     * 
     * @returns a string (char) representing the operator.
     */
    getCurrentOperator(){
        return this.operator;
    }

    /**
     * 
     * Get the result of the last operation done.
     * 
     * @returns a number representing the result.
     */
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

testCalc();