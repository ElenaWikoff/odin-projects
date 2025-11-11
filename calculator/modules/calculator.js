/* calculator.js
Calculator class.
*/

import { add, sub, mult, div, sqrt, perc, exp, pi, round, inverse, cos, sin, tan } from "./operators.js";

const defaultCalc = {
    value: "0",
    input: "0",
    op: "",
    memory: "0",
};

export default class Calculator {
    constructor() {
        this.value = defaultCalc.value;
        this.input = defaultCalc.input;
        this.op = defaultCalc.op;
        this.memory = defaultCalc.memory;
    }

    // Perform operation on values.
    #calc(op, x1, x2) {
        switch (op) {
            case "+": return add(x1, x2);
            case "-": return sub(x1, x2);
            case "*": return mult(x1, x2);
            case "/": return div(x1, x2);
            case "^": return exp(x1, x2);
            default: throw new InvalidInputError(`Invalid operator: ${op}.`);
        }
    }

    // Evaluate new value in calculator based on value, input and operator.
    #eval() {
        this.value = this.#calc(this.op, Number(this.value), Number(this.input));
    }

    // Clear methods

    // 'CE' or 'AC' - Clear current input on 'CE' or reset calculator on 'AC'
    clear(type) {
        if (type === 'ac') {
            this.value = defaultCalc.value;
            this.input = defaultCalc.input;
            this.op = defaultCalc.op;
        } else if (type === 'ce') {
            this.input = defaultCalc.input;
        } else {
            throw InvalidInputError(`Invalid type: ${type}`);
        }
    }

    // Memory methods

    // 'mc' - Clear memory to default: '0'
    memClear() {
        this.memory = defaultCalc.memory;
    }

    // 'mr' - Return value in memory
    memRecall() {
        return this.memory;
    }

    // 'm+' - Add value to value in memory
    memPlus(value) {
        this.memory = this.#calc("+", this.memory, value);
    }

    // 'm-' - Subtract value from value in memory
    memMinus(value) {
        this.memory -= this.#calc("-", this.memory, value);
    }

    // Evalutation methods

    // Set operator
    #setOp(op) {
        this.#eval();
        this.op = op;
    }

    // '=' - Evaluate
    equal() {
        if (this.operator.length == 1) {
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
        if (this.input === "0" && digit !== ".") {
            this.input = digit + "";
        } else {
            this.input += digit;
        }
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
        this.input = inverse(this.input);
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