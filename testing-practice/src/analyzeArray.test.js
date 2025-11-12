const analyzeArray = require("./analyzeArray.js");

test("returns object with correct properties describing array", () => {
  const array = [1, 8, 3, 4, 2, 6];
  const object = {
    average: 4,
    min: 1,
    max: 8,
    length: 6
  };
  expect(analyzeArray(array)).toEqual(object);
});