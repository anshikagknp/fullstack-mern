// let arr = [1,2,3,4,5]
//
// let newarr = arr.map((ele)=> ele**2)
// console.log(newarr);

const productDetails = [
    {proID: 1012 , proName: "iMac" , proPrice: 899},
    {proID: 1112 , proName: "Macbook" , proPrice: 1199},
    {proID: 3012 , proName: "iPad" , proPrice: 699},
    {proID: 2012 , proName: "Earpods" , proPrice: 599},
    {proID: 1412 , proName: "Charger" , proPrice: 199},
]

let newarr = productDetails.map((product) => {
    return {...product ,proPriceINR : (product.proPrice)*96}
})
console.log(newarr)
console.table(newarr)