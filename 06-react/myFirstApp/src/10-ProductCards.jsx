function MyCard({product}){
    return(
        <>
        <div className="card">
            <div className="card-header">
                {product.proName}
            </div>
            <div className="card-body">
                <p className="alert alert-info">
                    Product ID: {product.proID} <br/>
                    Product Price: {product.proPrice} <br/>
                    Product Quantity: {product.proQty} <br/>
                </p>
            </div>
            <div className="card-footer">
                <button className="btn btn-danger btn-block">Add to Cart</button>
            </div>
        </div>
        </>
    )
}



function Comp10(){
    const productDetails = [
    {proID: 1012 , proQty: 5, proName: "iMac" ,  proPrice: 899},
    {proID: 1112 , proQty: 2, proName: "Macbook" , proPrice: 1199},
    {proID: 3012 , proQty: 10, proName: "iPad" ,  proPrice: 699},
    {proID: 2012 , proQty: 25, proName: "Earpods" , proPrice: 599},
    {proID: 1412 , proQty: 50, proName: "Charger" , proPrice: 199},
    ];

    return(
        <>
        <h1 align='center'>Component 10</h1>
        <div className="container">
            {productDetails.length > 0 && 
            
            <div className="row">
                {productDetails.map((product) => (
                    <div className = "col-lg-3 col-md-4 col-sm-6">
                        <MyCard product={product}/>
                    </div>

                ))}
            
            </div>
            }
                
        </div>
        </> 
    );
}
export default Comp10;