const add = (x1, x2) => x1 + x2;      // Add x1 and x2
const subtract = (x1, x2) => x1 - x2; // Subtract x1 and x2
const multiply = (x1, x2) => x1 * x2; // Multiply x1 and x2
const divide = (x1, x2) => x1 / x2;   // Divide x1 and x2

const operate = (op, x1, x2) => {
    switch (op) {
        case "+": return add(x1, x2);
        case "-": return subtract(x1, x2);
        case "*": return multiply(x1, x2);
        case "/": return divide(x1, x2);
        default: throw new InvalidInputError(`Invalid operator: ${op}.`);
    }
};

const defaultCalc = {
    value: "0",
    input: "0",
    operator: "+",
};

let calc = {
    ...defaultCalc,
};

// const history = [calc];
// const historyStep = 0;
// const historyLength = 1;

// const saveHistory = (calc) => {
//     history.push({...calc});
//     historyStep += 1;
//     historyLength += 1;
// };

// const undo = () => {
//     if (historyStep > 0) {
//         const oldCalc = history[historyStep];
//         calc = {...oldCalc};
//     }
// }

const collapse = () => {
    const newCalc = {...calc};
    newCalc.value = operate(calc.operator, Number(calc.value), Number(calc.input));
    return calc.value;
};

const handlePressOp = (operator) => {
    collapse();
    calc.operator = operator;
    calc.input = "0";
}

const handlePressNum = (digit) => {
    calc.input += digit;
    return calc.input;
};

const handlePressCE = () => {
    calc = {...defaultCalc};
}

const printCalc = () => {
    console.log("Calculator:");
    console.log(`value: ${calc.value}`);
    console.log(`input: ${calc.input}`);
    console.log(`operator: ${calc.operator}`);
}

console.log(printCalc());

