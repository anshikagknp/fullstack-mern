const productDetails = [
    {proID: 1012 , proName: "iMac" , proPrice: 899},
    {proID: 1112 , proName: "Macbook" , proPrice: 1199},
    {proID: 3012 , proName: "iPad" , proPrice: 699},
    {proID: 2012 , proName: "Earpods" , proPrice: 599},
    {proID: 1412 , proName: "Charger" , proPrice: 199},
]

let sum = 0
productDetails.forEach((product) =>{
    sum= sum + product.proPrice
})
console.log("Total Price : "+sum);


