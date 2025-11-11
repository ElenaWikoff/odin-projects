// Cache
const base = [0, 1];

// Uses memoization to increase time efficiency.
const fibRec = (n) => {
  // Base Case
  if (n < base.length) {
    return base[n];
  }

  // Recursive Case
  const f = fibRec(n - 2) + fibRec(n - 1);

  // Add to fibonacci number to cache and return.
  base[n] = f;
  return f;
}

// Returns an array with a Fibonnaci sequence.
const fibs = (N) => {
  const result = [];
  for (let n = 0; n < N; n++) {
    result.push(fibRec(n));
  }
  return result;
}

console.log(fibs(8));
