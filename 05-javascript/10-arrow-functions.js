function myfun()
{
    console.log("My fun calling...");
    
}
let fn = function()
{
    console.log("Anonymous Function...")
}
fn()

fn = ()=>{
    console.log("Arrow Function...");
    
}
fn()

fn = (num)=>{
    console.log(num);
    console.log(num**3);
}
fn(5)

fn = (num)=>{
    console.log(num);
    return (num**3)
}
console.log(fn(5))

fn = (num)=>num**3
console.log(fn(5))

fn = num =>num**3
console.log(fn(5))

fn = (a, b)=> a**b
console.log(fn(5,3))

interest = (amt, rate, time=1)=>(amt*rate*time)/100
console.log("SI : " + interest(5000, 2, 2))