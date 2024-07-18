const createIterator = (array) => {
  let index = 0;
  return {
    next: () => {
      if (index < array.length) {
        return { value: array[index++], done: false };
      } else {
        return { value: undefined, done: true };
      }
    },
  };
};

const iterator = createIterator([1, 2, 3]);

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

//An iterator is an object that defines a sequence and potentially a return value upon its termination.

//The next() method returns the next value in the iterator. If there are no more values, it returns { value: undefined, done: true }
