const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched");
    }, 2000);
  });
};

fetchData()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });

//A Promise is an object representing the eventual completion or failure of an asynchronous operation.
// It provides a way to handle asynchronous operations more elegantly than using callbacks.
//States of a Promise:
//Pending: The initial state, neither fulfilled nor rejected.
//Fulfilled: The operation completed successfully.
//Rejected: The operation failed.
