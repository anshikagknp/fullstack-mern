import { useContext } from "react";
import { GlobalContext } from "./Contexts/AppContext";

function Comp1()
{
    const {userName, age, setUserName} = useContext(GlobalContext);
    return(
        <>
        <h1 align='center'>Component1 <br/> {userName} <br/> {age} </h1>
        <button onClick={()=>setUserName("Abhay")}>Update Name</button>
        </>
    );
}

export default Comp1;