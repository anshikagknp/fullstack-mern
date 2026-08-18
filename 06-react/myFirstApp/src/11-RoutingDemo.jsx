import {Routes, Route, Link} from 'react-router-dom'
import Comp1 from './01-BasicHeading';
import Comp2 from './02-FragmentDemo';
import ShowDetails from './12-Demo12';
import Comp10 from './10-ProductCards';
//npm install react-router-dom
function Comp11(){
    return(
        <>
            <h1 align="center">Component 11</h1>

            <Link to = "/home">Home</Link>
            <Link to = "/details/1001">Product</Link>
            <Link to = "/products">View All Products</Link>

            <Routes>
                <Route path="/" element={<Comp1/>} />
                <Route path="/home" element={<Comp2/>} />
                <Route path="/products" element={<Comp10/>} />
                <Route path="/details/:id" element={<ShowDetails/>} />
            </Routes>            
        </>
    )
};
export default Comp11;