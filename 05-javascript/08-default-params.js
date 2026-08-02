
function calc_int(rate, amt=5000, time=1)    //default-value arguments
{
    return (amt*rate*time)/100
}
console.log(calc_int(5000, 5, 1));
console.log(calc_int(5000, 5));
console.log(calc_int(5000, 5, 3));

console.log(calc_int(5));