import { useState, useEffect } from "react";

function Comp16(){

    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(500);

    useEffect(()=>{
        console.log("Use Effect...");
    }, [])

    return (
        <>
            <h1 align="center">Component 16</h1>
            <div
                style={{
                    border: "2px solid red",
                    padding: "20px",
                    marginBottom: "30px",
                }}
            >
                <h3>Count-1 : {count1}</h3>
                <button onClick={()=> setCount1(count1 + 1)}>Button 1</button>
            </div>

            <div
                style={{
                    border: "2px solid red",
                    padding: "20px",
                    marginBottom: "30px",
                }}
            >
                <h3>Count-2 : {count2}</h3>
                <button onClick={()=> setCount2(count2 + 100)}>Button 1</button>
            </div>
        </>
    );
}
export default Comp16;