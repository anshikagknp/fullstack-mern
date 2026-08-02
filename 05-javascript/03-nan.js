let a =5
let b=10
console.log(a*b);
//returns NaN
console.log(a*"abc");

//returns false every time
console.log((a*"abc")===NaN);
console.log(NaN===NaN);

//this function returns true
console.log(isNaN(a*"abc"));

//this function returns false
console.log(isNaN(a*"5"));



