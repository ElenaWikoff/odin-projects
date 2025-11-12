const Calculator = require("./calculator.js");

describe("Calculator", () => {
  const calculator = new Calculator();

  test("add two numbers", () => {
    expect(calculator.add(2, 2)).toBe(4);
    expect(calculator.add(-2, -2)).toBe(-4);
    expect(calculator.add(2.6, 2.1)).toBe(4.7);
  });

  test("find the difference between two numbers", () => {
    expect(calculator.subtract(2, 2)).toBe(0);
    expect(calculator.subtract(-2, -2)).toBe(0);
    expect(calculator.subtract(2.6, 2.1)).toBe(0.5);
  });

  test("divide a number by another", () => {
    expect(calculator.divide(2, 2)).toBe(1);
    expect(calculator.divide(-2, -2)).toBe(1);
    expect(calculator.divide(5, 2)).toBe(2.5);
    expect(calculator.divide(5.0, 2.0)).toBe(2.5);
  });

  test("don't allow divide by zero", () => {
    expect(() => calculator.divide(2, 0)).toThrow("Cannot divide by zero");
  });

  test("multiply two numbers", () => {
    expect(calculator.multiply(2, 2)).toBe(4);
    expect(calculator.multiply(-2, -2)).toBe(4);
    expect(calculator.multiply(5, 2)).toBe(10);
    expect(calculator.multiply(5.0, 2.0)).toBe(10.0);
  });

  test("converts strings to numbers", () => {
    expect(calculator.add("2", "2")).toBe(4);
    expect(calculator.subtract("2", "2")).toBe(0);
    expect(calculator.divide("2", "2")).toBe(1);
    expect(calculator.multiply("2", "2")).toBe(4);
  });
})
