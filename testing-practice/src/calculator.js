
class Calculator {
  add(a, b) {
    return Number(a) + Number(b);
  }

  subtract(a, b) {
    return Number(a) - Number(b);
  }

  divide(a, b) {
    if (Number(b) === 0) {
      throw new Error("Cannot divide by zero");
    }
    return Number(a) / Number(b);
  }

  multiply(a, b) {
    return Number(a) * Number(b);
  }

}
module.exports = Calculator;
