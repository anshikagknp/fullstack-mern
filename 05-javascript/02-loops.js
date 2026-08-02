let arr = [10,20,30,40,50]

//for of, used with arrays
//reads and returns values of the array
for(let ele of arr)
{
    console.log(ele);
}

let userData={
    unm:"Sachin",
    age: 45,
    email: 'sachin@gmail.com'
}
//for in, returns keys with objects
//returns indexes with arrays
for(let key in userData)
{
    console.log(key, userData[key]);
}