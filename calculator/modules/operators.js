/* operator.js
Functions for operations on a calculator.
*/

// Add x1 and x2
export const add = (x1, x2) => x1 + x2;

// Subtract x1 and x2
export const sub = (x1, x2) => x1 - x2;

// Multiply x1 and x2
export const mult = (x1, x2) => x1 * x2;

// Divide x1 and x2
export const div = (x1, x2) => x1 / x2;

// Square root of x
export const sqrt = (x) => Math.sqrt(x);

// Turn x into percentage, '9' => '0.09'.
export const perc = (x) => x / 100;

// Calculate x1 to the power of x2
export const exp = (x1, x2) => Math.pow(x1, x2);

// Return value for π (pi)
export const pi = () => Math.PI;

// Round x to <dec> decimal places.
export const round = (x, dec) => {
    const factor = Math.pow(10, dec);
    return Math.round(x * factor) / factor;
};

// Switch sign of x
export const inverse = (x) => -x;

// Convert degrees to radians
const degreesToRadians = (degrees) => degrees * (Math.PI / 180);

// Convert radians to degrees
const radiansToDegrees = (radians) => radians * (180 / Math.PI);

// Calculate cosine of x
export const cos = (x) => radiansToDegrees(Math.cos(degreesToRadians(x)));

// Calculate sine of x
export const sin = (x) => radiansToDegrees(Math.sin(degreesToRadians(x)));

// Calculate tangent of x
export const tan = (x) => radiansToDegrees(Math.tan(degreesToRadians(x)));