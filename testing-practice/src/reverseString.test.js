const reverseString = require("./reverseString.js")

test("take a string and return it reversed", () => {
  const sBefore = [
    "",
    "apple",
    "orange",
    "banana",
    "the quick brown fox jumps over the lazy dog",
  ];

  const sAfter = [
    "",
    "elppa",
    "egnaro",
    "ananab",
    "god yzal eht revo spmuj xof nworb kciuq eht",
  ];

  sBefore.forEach((s, i) => {
    expect(reverseString(s)).toBe(sAfter[i]);
  });

});