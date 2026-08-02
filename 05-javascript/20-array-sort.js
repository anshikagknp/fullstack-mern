let arr = [23,46,55,67,58,55,83,101]

// changes the original array
// gives wrong output, because the numbers are considered as string and first characters are matched
// arr.sort()
// console.log(arr);

//to not change the original array
// let r = [...arr].sort((a,b) => a-b)
// console.log(r)

// let userNames = ["Sachin", "Yuvraj", "Virendra", "Rahul"]
// let sortedNames = [...userNames].sort((a, b) => a.localeCompare(b))
// console.log(sortedNames)

const productDetails = [
    {proID: 1012 , proName: "iMac" , proPrice: 899},
    {proID: 1112 , proName: "Macbook" , proPrice: 1199},
    {proID: 3012 , proName: "iPad" , proPrice: 699},
    {proID: 2012 , proName: "Earpods" , proPrice: 599},
    {proID: 1412 , proName: "Charger" , proPrice: 199},
]

let sort = [...productDetails].sort((a,b)=> {
    return a.proPrice - b.proPrice
})
console.log(sort)

let sortname = [...productDetails].sort((a,b)=> {
    return (a.proName).localeCompare(b.proName)
})
console.log(sortname)