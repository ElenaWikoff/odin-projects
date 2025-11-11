
// Keep track of whether mouse is down
var mouseDown = false;
window.addEventListener("mousedown", () => { mouseDown = true });
window.addEventListener("mouseup", () => { mouseDown = false });

// Start javascript on DOM load
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM Content Loaded");

    // Initialize squares
    createSquares(16);
});

// Clear etch-a-sketch of squares (in order to repopulate)
const clearSquares = () => {
    const container = document.getElementById("container");
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => container.removeChild(square));
}

// Create grid of rxr squares
const createSquares = (r) => {
    const container = document.getElementById("container");

    // Create rxr grid of squares
    for (i = 0; i < r; i++) {
        for (j = 0; j < r; j++) {
            const square = document.createElement("div");
            square.setAttribute("id", `square-${i}-${j}`);
            square.setAttribute("data-value", 0);
            square.classList.add("square");

            // Set width and height of squares
            square.style.maxWidth = `${1 / r * 100}%`;
            square.style.maxHeight = `${1 / r * 100}%`;

            // Add hover mouse events
            square.addEventListener('mouseover', handleSquareEnter);
            square.addEventListener('mousedown', handleSquareEnter);

            // Add squares container grid
            container.appendChild(square);
        }
    }
}

// Prompt user for number of squares per row/col they want on the etch-a-sketch
const setSquares = () => {
    let r = prompt("Please input how many rows and columns for the grid (max: 100):");
    if (r > 100) {
        r = 100;
    }
    clearSquares();
    createSquares(r);
}

// On square enter while mouse down, darken the square by 10%.
const handleSquareEnter = (event) => {
    event.preventDefault();
    if (mouseDown) {
        const square = event.target;
        let value = Number(square.getAttribute("data-value"));
        if (!value) {
            square.setAttribute("data-value", 1);
        } else if (value < 10) {
            value += 1;
            square.setAttribute("data-value", value);
        }
    }
}

// Clear squares of opacity
const shake = () => {
    const container = document.getElementById("container");
    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => square.setAttribute("data-value", 0));
}