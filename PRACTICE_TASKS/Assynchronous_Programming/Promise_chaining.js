const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched");
    }, 2000);
  });
};

fetchData()
  .then((data) => {
    console.log(data); // "Data fetched"
    return "Next step";
  })
  .then((next) => {
    console.log(next); // "Next step"
    return "Another step";
  })
  .then((another) => {
    console.log(another); // "Another step"
  })
  .catch((error) => {
    console.error(error);
  });

//Promise chaining allows  to perform a series of asynchronous operations one after the other.
