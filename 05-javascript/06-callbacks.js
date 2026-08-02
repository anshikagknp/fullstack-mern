function myAdd(a, b){
    return a+b
}

function mySub(a, b){
    return a-b
}

function calculate(x, y, fn){
    return fn(x,y)     //callback functions
}

console.log(calculate(5,7,myAdd));

