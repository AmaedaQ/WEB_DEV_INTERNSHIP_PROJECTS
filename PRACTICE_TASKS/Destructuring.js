// Destructuring an array
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;

console.log(first);
console.log(second);
console.log(rest);

// Destructuring an object
const person = {
  name: "Alice",
  age: 25,
  address: {
    city: "Wonderland",
    zip: "12345",
  },
};

const {
  name,
  age,
  address: { city, zip },
} = person;

console.log(name);
console.log(age);
console.log(city);
console.log(zip);

// default-values
const person2 = {
  name2: "Alice",
  age2: 25,
};

// Default values
const { name2, age2, gender = "female" } = person2;

console.log(name2);
console.log(age2);
console.log(gender);
