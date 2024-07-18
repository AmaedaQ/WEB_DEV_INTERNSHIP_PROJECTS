// Spread in array
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5, 6];
console.log(arr2);

// Spread in object
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };
console.log(obj2);

// Rest in function parameters
const sum = (...numbers) => {
  return numbers.reduce((total, num) => total + num, 0);
};
console.log(sum(1, 2, 3));
console.log(sum(1, 2, 3, 4));

// Rest in array destructuring
const [first, second, ...restArray] = [1, 2, 3, 4, 5];
console.log(first);
console.log(second);
console.log(restArray);

// Rest in object destructuring
const { a, b, ...restObj } = { a: 1, b: 2, c: 3, d: 4 };
console.log(a);
console.log(b);
console.log(restObj);

// Spread Operator: Expands an array or object into its individual elements.
//Rest Operator: Collects multiple elements into a single array or object.
