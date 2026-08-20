//Context
import { useState, useEffect, createContext, useContext } from "react";

// 1) Create a Context
const MyContext = createContext()

function Comp18(){

    const userName = "Anshika";
    const age = 23;
    return (
        <>
            <h1 align="center">Component 18</h1>

            {/* 2) Provide a Context with value */}
            <MyContext.Provider value = {{userName, age}}>
                <CompA />
            </MyContext.Provider>

        </>
    );
}

function CompA(){

    return (
        <>
            <h1 align="center">Component A</h1>
            <CompB/>
        </>
    );
}

function CompB(){

    return (
        <>
            <h1 align="center">Component B</h1>
            <CompC/>
        </>
    );
}

function CompC(){

    // 3) Use Context (Consume Context)
    // const r = useContext(MyContext)
    const {userName, age} = useContext(MyContext)
    return (
        <>
            <h1 align="center">Component C</h1>
            {userName}
            <br/>
            {age}
        </>
    );
}

export default Comp18;