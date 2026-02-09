import Calculator from "./modules/calculator.js";

const defaultCalc = ["0", "0", "", "0", true, true];

// Initialize calculator with default values
const calc = new Calculator(...defaultCalc);

console.log(calc.print());

// Handle updating calculator screen after button presses
const handleUpdateScreen = () => {
    const screen = document.getElementById("fscreen");
    screen.value = "" + calc.input;
    screen.textContent = "" + calc.input;
}

// Handle number button presses
const handlePressNum = (digit) => {
    calc.addDigit(digit);
    calc.print();
    handleUpdateScreen();
    handleUpdateClearButton();
};

// Prevent from typing non-numeric characters in calculator screen
const screen = document.getElementById("fscreen");
screen.addEventListener("keydown", (e) => {
    e.preventDefault();
    const char = e.key;
    if (/[0-9.]/.test(char)) {
        handlePressNum(char);
    } else if (char === "Backspace" || char === "Delete") {
        calc.back();
        handleUpdateScreen();
    }
});

// Handle toggling clear button between 'AC' and 'CE' based on calculator state
const handleUpdateClearButton = () => {
    const clearButton = document.getElementById("clear");
    clearButton.value = calc.canAC ? "ac" : "ce";
    clearButton.textContent = calc.canAC ? "AC" : "CE";
}

// Attach handlers to number buttons
const numButtons = document.querySelectorAll(".btn-num");
numButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const digit = e.currentTarget.value;
        handlePressNum(digit);
    });
});

// Handler for action buttons
const actionButtons = document.querySelectorAll(".btn-action")
actionButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const action = e.currentTarget.value;
        switch (action) {
            case "ac":
            case "ce": calc.clear(action); break;
            case "mc": calc.memClear(); break;
            case "mr": calc.memRecall(); break;
            case "m+": calc.memPlus(Number(calc.input)); break;
            case "m-": calc.memMinus(Number(calc.input)); break;
            case "back": calc.back(); break;
            case "cos": calc.cos(); break;
            case "sin": calc.sin(); break;
            case "tan": calc.tan(); break;
            case "sqrt": calc.sqrt(); break;
            case "perc": calc.percent(); break;
            case "pi": calc.pi(); break;
            case "exp": break; // Should never happen
            case "r2": calc.r2(); break;
            case "r0": calc.r0(); break;
            case "inv": calc.inverse(); break;
            default: throw new Error(`Invalid action: ${action}.`);
        }
        calc.print();
        handleUpdateScreen();
        handleUpdateClearButton();
    });
});

// Attach handler for operator buttons
const opButtons = document.querySelectorAll(".btn-op");
opButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const updateScreen = calc.op.length === 1 ? true : false;
        const op = e.currentTarget.value;
        switch (op) {
            case "+": calc.add(); break;
            case "-": calc.sub(); break;
            case "x": calc.mult(); break;
            case "/": calc.div(); break;
            case "exp": calc.exp(); break;
            case "=": calc.equal(); break;
            default: throw new Error(`Invalid operator: ${op}.`);
        }
        calc.print();
        if (updateScreen) {
            handleUpdateScreen();
        }
        handleUpdateClearButton();
    });
});