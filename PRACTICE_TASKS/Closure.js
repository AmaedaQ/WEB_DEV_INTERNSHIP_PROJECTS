function outerFunction() {
  let outerVariable = "I'm from outer scope";

  function innerFunction() {
    console.log(outerVariable);
  }

  return innerFunction;
}

const myInnerFunction = outerFunction();
myInnerFunction();

//A closure is a feature in JavaScript where an inner function has access to the outer (enclosing) function’s variables—scope chain.
//This includes the outer function’s variables, global variables, and its own variables.
//Closures are created every time a function is created, at function creation time.
