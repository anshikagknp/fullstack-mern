//let arr = [1,2,3,4,5,6,7]
//const val = 6
//r = arr.find((ele) => ele === val)
//console.log(r);

const productDetails = [
    {proID: 1012 , proName: "iMac" , proPrice: 899},
    {proID: 1112 , proName: "Macbook" , proPrice: 1199},
    {proID: 3012 , proName: "iPad" , proPrice: 699},
    {proID: 2012 , proName: "Earpods" , proPrice: 599},
    {proID: 1412 , proName: "Charger" , proPrice: 199},
]

let productName = "iMac"
const r = productDetails.find((product) => {
    if (product.proName === productName)
        return true
})

let arr = []
arr.push(r)

let newarr = arr.map((product)=>{
    return {...product ,proPriceINR : (product.proPrice)*96}
})

console.log(arr)
console.table(newarr)