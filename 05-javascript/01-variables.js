console.log("Hi fron node....")

//Declaration and Initialisation

// 'let' is used for variables that can change later (mutable)
let userName = "Alex";
let userAge = 25;

// 'const' is used for values that must remain fixed (immutable)
const totalDaysInWeek = 7;
const piValue = 3.14159;

// 'var' is the legacy keyword (avoid using this in modern code)
var legacyScore = 100;

// You can also declare a variable without a value. It defaults to 'undefined'.
let userScore;
console.log(userScore); // Outputs: undefined

//Reassignment

// Variables declared with 'let' can be reassigned a new value
userName = "Taylor";
userAge = 26;
console.log(userName); // Outputs: Taylor

// UNCOMMENTING THE LINE BELOW WILL CAUSE AN ERROR:
// totalDaysInWeek = 8; // TypeError: Assignment to constant variable.

// Block Scope: 'let' and 'const' only exist inside the curly braces {} they are born in.
{
    let blockVariable = "I am hidden inside this block!";
    console.log(blockVariable); // Works fine
}
// UNCOMMENTING THE LINE BELOW WILL CAUSE AN ERROR:
// console.log(blockVariable); // ReferenceError: blockVariable is not defined