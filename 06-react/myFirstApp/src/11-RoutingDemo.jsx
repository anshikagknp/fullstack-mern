import {Routes, Route} from 'react-router-dom'
import Comp1 from './01-BasicHeading';
import Comp2 from './02-FragmentDemo';
import Comp3 from './03-JsxExpressions';
//npm install react-router-dom
function Comp11(){
    return(
        <>
            <Routes>
                <Route path="/" element={<Comp1/>} />
                <Route path="/home" element={<Comp2/>} />
                <Route path="/topics" element={<Comp3/>} />
            </Routes>
            <h1 align="center">Component 9</h1>
            
        </>
    )
};
export default Comp11;