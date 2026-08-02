let arr = [1,2,3,4,5]
console.log(arr);

let a = arr.slice(2,4)
console.log(a);

arr.push(100)   //adds element to the last

arr.push(200, 300, 400) //many elements to last

arr.unshift(900)    //adds elements to beginning

arr.unshift(200, 300, 400)  //many elements to beginning

let r = arr.pop()   //removes and returns the last element

let r = arr.shift()     //removes and returns the first element

console.log(arr)