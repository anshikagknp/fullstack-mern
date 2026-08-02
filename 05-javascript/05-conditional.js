
function myfun(num){
    console.log("Hi from myfun.... :) ");
    
    if(num == 0)
        return "Number is zero"
    else if(num > 0)
        return "Number is positive"
    else
        return "Number is Negative"

    //return statement pushes the function out of function-calling stack
    console.log("Bye from myfun..... :) ");  //unreachable code
}

console.log(myfun(5));
