//reduce returns one value out of an array operation
let arr =[100, 200, 300, 400]

//sum of elements of an array using reduce
//let r = arr.reduce((sum, ele)=> sum+ele, 0)
//console.log(r);

const productDetails = [
    {proID: 1012 , proQty: 5, proName: "iMac" ,  proPrice: 899},
    {proID: 1112 , proQty: 2, proName: "Macbook" , proPrice: 1199},
    {proID: 3012 , proQty: 10, proName: "iPad" ,  proPrice: 699},
    {proID: 2012 , proQty: 25, proName: "Earpods" , proPrice: 599},
    {proID: 1412 , proQty: 50, proName: "Charger" , proPrice: 199},
]

let final_amt = productDetails.reduce((sum, prod)=>{
    sum = sum + (prod.proPrice)*(prod.proQty)
    return sum
}, 0)
console.log("Final Amount : " +final_amt)