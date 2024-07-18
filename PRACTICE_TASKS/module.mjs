const greet = (name) => `Hello, ${name}!`;
const farewell = (name) => `Goodbye, ${name}!`;

export { greet };
export default farewell;

//Modules in JavaScript allow you to break up your code into separate files, each with its own scope.
//ES6(ECMAScript 2015) introduced a standardized module system to JavaScript
//Modules in JavaScript are created using the import and export statements in ES6.
// The import statement is used to bring in items from other modules, and the export statement is used to export items to other modules.

// Basic Concepts:
// Exporting: Making variables, functions, or classes available for import in other modules.
// Importing: Bringing in variables, functions, or classes from other modules.
//Named Exports: You can export multiple items from a module and import only the items you need.
//Default Exports: You can export a default value from a module and import it in other modules.
//Exporting and Importing: You can import a module and access its exported items in other modules.
