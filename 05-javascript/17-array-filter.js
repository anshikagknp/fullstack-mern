let arr = [1,2,3,4,5]

const r = arr.filter((ele)=>{
    if(ele%2 == 0)
        return true
})

console.log(r)


//another question
const productDetails = [
    {proID: 1012 , proName: "iMac" , proPrice: 899},
    {proID: 1112 , proName: "Macbook" , proPrice: 1199},
    {proID: 3012 , proName: "iPad" , proPrice: 699},
    {proID: 2012 , proName: "Earpods" , proPrice: 599},
    {proID: 1412 , proName: "Charger" , proPrice: 199},
]

const newarr = productDetails.filter((product) => {
    if(product.proPrice > 700)
        return true
})
//console.log(newarr)
console.table(newarr)