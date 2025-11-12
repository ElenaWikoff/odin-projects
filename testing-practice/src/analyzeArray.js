
function analyzeArray(array) {
  if (array.length === 0) {
    return {
      average: 0,
      min: 0,
      max: 0,
      length: 0,
    };
  }

  let sum = 0;
  let min = Infinity
  let max = -Infinity;
  array.forEach((n) => {
    sum += n;
    min = (n < min) ? n : min;
    max = (n > max) ? n : max;
  });

  return {
    average: sum / array.length,
    min: min,
    max: max,
    length: array.length,
  };
}
module.exports = analyzeArray;