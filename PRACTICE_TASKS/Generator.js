// Generator
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();

console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// Generators are functions that can pause its execution and later resume from where it left off.

// The yield keyword is used to pause the execution of a function and return a value

//The generator's next method resumes execution until the next yield or the function returns.
