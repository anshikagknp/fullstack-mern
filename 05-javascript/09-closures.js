function outerfun()
{
    let msg = "Welcome"
    console.log("Outer fun ...");
    function innerfun(name)
    {
        console.log("inner fun is calling....");
        console.log(msg + name);
        
    }
    //innerfun()
    return innerfun
}

//closure function
let fn = outerfun()
console.log(fn);
fn("Sachin");
