
function myfun()       //function definition
{
    console.log("My fun calling... ");
}

myfun()                 //it goes to function address and calls it

//returns reference of the function
console.log(myfun);    //myfun here is a pointer that contains function memory address

let fn = myfun
console.log(fn);
fn()


