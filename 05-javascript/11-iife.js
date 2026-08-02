//Immediately Invoked Function Expression
(function()
{
    console.log("IIFE Function Calling...");
})();

let sum = (function(a, b)
{
    return a+b
})(5,6)
console.log(sum);