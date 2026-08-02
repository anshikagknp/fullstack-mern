let arr = [1,2,3,4,5]
console.log(arr);

//Insert at index 2
arr.splice(2,0,10,20,30)
console.log(arr);

//update at Index 0
arr.splice(0,1,1000)
console.log(arr)

//delete count 1 at index 2
arr.splice(2, 1)
console.log(arr);

console.log(arr.indexOf(4))
console.log(arr.indexOf(12))
console.log(arr.includes(12))
console.log(arr.includes(2))

//spread operator
let arr2= [...arr,7,8,9]
console.log(arr2)
