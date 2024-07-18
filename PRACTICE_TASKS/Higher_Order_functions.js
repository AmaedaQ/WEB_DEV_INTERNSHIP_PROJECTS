// Example 1: Function that accepts another function as an argument
const applyOperation = (x, y, operation) => {
  return operation(x, y);
};

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

console.log(applyOperation(5, 3, add));
console.log(applyOperation(5, 3, multiply));

// Example 2: Function that returns another function
const createGreeter = (greeting) => {
  return (name) => `${greeting}, ${name}!`;
};

const greetHello = createGreeter("Hello");
const greetHi = createGreeter("Hi");

console.log(greetHello("Alice"));
console.log(greetHi("Bob"));

// Example 3: Using Array.map (a higher-order function)
const numbers = [1, 2, 3, 4];
const squaredNumbers = numbers.map((num) => num * num);

console.log(squaredNumbers);

// Example 4: Using Array.filter (a higher-order function)
const numbers2 = [1, 2, 3, 4, 5, 6];
const evenNumbers = numbers.filter((num) => num % 2 === 0);

console.log(evenNumbers);

// Example 5: Using Array.reduce (a higher-order function)
const numbers3 = [1, 2, 3, 4, 5];
const total = numbers3.reduce((acc, num) => acc + num, 0);
console.log(total);
