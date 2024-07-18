// Pure function: adds two numbers
const add = (a, b) => {
  return a + b;
};

// Pure function: multiplies two numbers
const multiply = (a, b) => {
  return a * b;
};

// Pure function: generates a greeting message
const greet = (name) => {
  return `Hello, ${name}!`;
};

// Testing the pure functions
console.log(add(2, 3)); // 5
console.log(multiply(4, 5)); // 20
console.log(greet("Alice")); // Hello, Alice!

// impure-function.

let count = 0;

// Impure function: modifies external state
const incrementCount = () => {
  count += 1;
  return count;
};

// Impure function: depends on an external variable
const greetImpure = () => {
  return `Hello, ${name}!`;
};

// Testing the impure functions
console.log(incrementCount()); // 1
console.log(incrementCount()); // 2

let name = "Bob";
console.log(greetImpure()); // Hello, Bob!
name = "Alice";
console.log(greetImpure()); // Hello, Alice!
