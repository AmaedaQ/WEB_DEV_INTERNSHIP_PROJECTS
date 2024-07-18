//IIFE (Immediately Invoked Function Expression) is a function that runs the moment it is invoked or called in the JavaScript event loop

//The IIFE helps to avoid the global scope pollution

(function () {
  console.log("IIFE");
})();

(function () {
  var x = 10;
  console.log(x);
})();

// Simulated async function to fetch data
const fetchData = async (url) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulated response
  const data = {
    userId: 1,
    id: 1,
    title: "Sample Data",
    completed: false,
  };
  return data;
};

// IIFE using async/await
(async () => {
  try {
    console.log("Fetching data...");
    const data = await fetchData(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    console.log("Data fetched:", data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();

console.log("This will run immediately, even before the data is fetched.");
