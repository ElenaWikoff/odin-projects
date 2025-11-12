
function caesarCipher(s, shift) {
  let encrypted = "";

  const A = 65;  // "A" character code
  const Z = 90;  // "Z" character code
  const a = 97;  // "a" character code
  const z = 122; // "z" character code

  for (let i = 0; i < s.length; i++) {
    // Get current character's ascii code.
    let ascii = s.charCodeAt(i);

    // Handle uppercase character.
    if (ascii >= A && ascii <= Z) {
      ascii += shift;
      if (ascii > Z) {
        const overflow = ascii - Z - 1;
        ascii = A + overflow;
      }
    } else if (ascii >= a && ascii <= z) {
      // Handle lowercase character.
      ascii += shift;
      if (ascii > z) {
        const overflow = ascii - z - 1;
        ascii = a + overflow;
      }
    }

    // Add character to encrypted message.
    encrypted += String.fromCharCode(ascii);
  }
  return encrypted;
}
module.exports = caesarCipher;
