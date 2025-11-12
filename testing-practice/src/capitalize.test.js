const capitalize = require("./capitalize.js")

test("take a string and return it with the first character capitalized", () => {
  const sBefore = [
    "apple",
    "Apple",
    "APPLE",
    "the quick brown fox jumps over the lazy dog",
  ];

  const sAfter = [
    "Apple",
    "Apple",
    "APPLE",
    "The quick brown fox jumps over the lazy dog",
  ];

  sBefore.forEach((s, i) => {
    expect(capitalize(s)).toBe(sAfter[i]);
  });

});