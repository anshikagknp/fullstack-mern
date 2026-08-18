import {useState} from "react";

function ProductLoader(){
    const [productsData, setProductsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    function loadProducts(){
        setIsLoading(true);
        setTimeout(()=>{
            setProductsData([
            {proID: 1012 , proQty: 5, proName: "iMac" ,  proPrice: 899},
            {proID: 1112 , proQty: 2, proName: "Macbook" , proPrice: 1199},
            {proID: 3012 , proQty: 10, proName: "iPad" ,  proPrice: 699},
            {proID: 2012 , proQty: 25, proName: "Earpods" , proPrice: 599},
            {proID: 1412 , proQty: 50, proName: "Charger" , proPrice: 199},
            ])
            setIsLoading(false);
        }, 3000)
    }

    return(
        <>
        <h1 align="center">Component 14</h1>
        <button onClick = {loadProducts} disabled = {isLoading} >
            {isLoading ? <span className="spinner-border text-info"></span> : "Load Products"}
        </button>

        {/* {isLoading && <span className="spinner-border"></span>} */}
        <div className="container">
            {productsData.length>0 && (
                <table className="table table-bordered">
                    <thead className="table table-primary">
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Product Qty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsData.map((product) => (
                            <tr>
                                <td>{product.proID}</td>
                                <td>{product.proName}</td>
                                <td>{product.proPrice}</td>
                                <td>{product.proQty}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}    
        </div>
        </>
    );
}
export default ProductLoader;