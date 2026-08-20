//props drilling
import { useState, useEffect } from "react";

function Comp17(){

    const userName = "Anshika"
    return (
        <>
            <h1 align="center">Component 17</h1>
            <CompA userName = {userName}/>
            
        </>
    );
}
function CompA({userName}){

    return (
        <>
            <h1 align="center">Component A</h1>
            <CompB userName={userName}/>
        </>
    );
}
function CompB({userName}){

    return (
        <>
            <h1 align="center">Component B</h1>
            <CompC userName={userName}/>
        </>
    );
}
function CompC({userName}){

    return (
        <>
            <h1 align="center">Component C</h1>
            {userName}
        </>
    );
}

export default Comp17;