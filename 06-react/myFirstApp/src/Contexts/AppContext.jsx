import { createContext, useState } from "react";

// 1) Create a Context
export const GlobalContext = createContext()
export function ApplicationContext({children}){

    // const userName = "Anshika";
    const [userName, setUserName] = useState("Anshika");
    const age = 23;
    return(
        <>
        <GlobalContext.Provider value = {{ userName, age , setUserName}}>
            {children}
        </GlobalContext.Provider>
        </>
    );
}