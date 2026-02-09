/* calculator.js
Calculator class.
*/

import { add, sub, mult, div, sqrt, perc, exp, pi, round, inverse, cos, sin, tan } from "./operators.js";

const defaultCalc = {
    value: "0",
    input: "0",
    op: "",
    memory: "0",
    canAppend: true,
    canAC: true,
};

export default class Calculator {
    constructor() {
        this.value = defaultCalc.value;
        this.input = defaultCalc.input;
        this.op = defaultCalc.op;
        this.memory = defaultCalc.memory;
        this.canAppend = defaultCalc.canAppend;
        this.canAC = defaultCalc.canAC;
    }

    // Perform operation on values.
    #calc(op, x1, x2) {
        console.log(`Calculating: ${x1} ${op} ${x2}`);
        switch (op) {
            case "+": return add(x1, x2);
            case "-": return sub(x1, x2);
            case "*": return mult(x1, x2);
            case "/": return div(x1, x2);
            case "^": return exp(x1, x2);
            case " ":
            case "": return x2;
            default: throw new Error(`Invalid operator: ${op}.`);
        }
    }

    // Evaluate new value in calculator based on value, input and operator.
    #eval() {
        this.value = this.#calc(this.op, Number(this.value), Number(this.input));
        if (isNaN(this.value) || !isFinite(this.value)) {
            this.input = "NaN";
            this.value = "0";
            this.canAppend = false;
        } else {
            this.input = "" + this.value;
        }
    }

    // Clear methods

    // 'CE' or 'AC' - Clear current input on 'CE' or reset calculator on 'AC'
    clear(type) {
        if (type === 'ac') {
            this.value = defaultCalc.value;
            this.input = defaultCalc.input;
            this.op = defaultCalc.op;
            this.memory = defaultCalc.memory;
            this.canAppend = defaultCalc.canAppend;
            this.canAC = defaultCalc.canAC;
        } else if (type === 'ce') {
            this.canAC = true;
            this.input = defaultCalc.input;
        } else {
            throw Error(`Invalid type: ${type}`);
        }
    }

    // Memory methods

    // 'mc' - Memory clear: Clear value in memory
    memClear() {
        this.memory = defaultCalc.memory;
    }

    // 'mr' - Memory recall: Set input to value in memory
    memRecall() {
        this.input = this.memory;
    }

    // 'm+' - Memory plus: Add value to value in memory
    memPlus() {
        this.memory = this.#calc("+", Number(this.memory), Number(this.input));
    }

    // 'm-' - Memory minus: Subtract value from value in memory
    memMinus() {
        this.memory = this.#calc("-", Number(this.memory), Number(this.input));
    }

    // Evalutation methods

    // Set operator
    #setOp(op) {
        this.#eval();
        this.op = op;
        this.canAppend = false;
    }

    // '=' - Evaluate
    equal() {
        if (this.op.length == 1) {
            this.#eval();
        }
    }

    // '+'  - Set operator to '+' (add)
    add() {
        this.#setOp("+");
    }

    // '-'  - Set operator to '-' (subtract)
    sub() {
        this.#setOp("-");
        this.input = "0";
    }

    // 'x'  - Set operator to '*' (multiply)
    mult() {
        this.#setOp("*");
    }

    // '÷'  - Set operator to '/' (divide)
    div() {
        this.#setOp("/");
    }

    // Set operator to '^' (exponent)
    exp() {
        this.#setOp("^");
    }

    // Input methods

    // Input digit or decimal: '.' or '1,2,3,4,5,6,7,8,9,0'
    addDigit(digit) {
        if (this.canAppend && this.input !== "0") {
            if (digit === "." && this.input.includes(".")) {
                return;
            }
            this.input += digit;
        } else {
            if (digit === ".") {
                this.input = "0.";
            } else {
                this.input = digit;
            }
            this.canAppend = true;
        }
        this.canAC = false;
    }

    // Square root input
    sqrt() {
        this.input = sqrt(this.input);
    }

    // Divide input by 100
    percent() {
        this.input = perc(this.input);
    }

    // Set input to pi
    pi() {
        this.input = pi();
        this.canAC = false;
    }

    // Round input to nearest cent
    r2() {
        this.input = round(this.input, 2);
    }

    // Round input to nearest integer
    r0() {
        this.input = round(this.input, 0);
    }

    // Inverse sign of input
    inverse() {
        this.input = this.input * -1;
    }

    // Calculate cosine of input
    cos() {
        this.input = cos(this.input);
    }

    // Calculate sine of input
    sin() {
        this.input = sin(this.input);
    }

    // Calculate tangent of input
    tan() {
        this.input = tan(this.input);
    }

    // Remove last digit added to input. Set to '0' if only single digit.
    back() {
        if (this.input.length === 1) {
            this.input = "0";
        } else {
            this.input = this.input.slice(0, -1);
        }
    }

    // Debug methods

    // Print values for this calculator
    print() {
        console.log(`Calculator - Value: ${this.value}, Input: ${this.input}, Operator: ${this.op}, Memory: ${this.memory}`);
    }
};