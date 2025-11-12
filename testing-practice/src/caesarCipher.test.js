const caesarCipher = require("./caesarCipher.js");

describe("A Caesar Cipher", () => {
  test("letters are shifted", () => {
    expect(caesarCipher("abc", 2)).toBe("cde");
    expect(caesarCipher("abc", 3)).toBe("def");
  });

  test("letters should wrap", () => {
    expect(caesarCipher("xyz", 3)).toBe("abc");
  });

  test("case is preserved", () => {
    expect(caesarCipher("HeLLo", 3)).toBe("KhOOr");
  });

  test("pronunciation is preserved", () => {
    expect(caesarCipher("Hello, World!", 3)).toBe("Khoor, Zruog!");
  });
});
