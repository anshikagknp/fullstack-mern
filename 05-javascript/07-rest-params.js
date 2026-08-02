function myAdd(a, b){
    return a+b
}
console.log(myAdd(5));  //NaN


function myAdd(a, b, ...c)  //rest parameter
{
    console.log(a);
    console.log(b);
    console.log(c);         //array
    return
}
console.log(myAdd(5,6,7,8));