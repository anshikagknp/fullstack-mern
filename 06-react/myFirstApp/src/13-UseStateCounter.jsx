import {useState} from 'react';

function UseStateCounter(){

    // let count = 0
    let [count, setCount] = useState(0);
    let [userName, setUserName] = useState("");
    let [age, setAge] = useState(18);

    console.log(count);

    function btnClick(){

        // count = count + 1;
        // console.log(count);
        setCount(count + 1);
    }

    return(
        <>
        <h1 align="center">Component 13</h1>
        count : {count} <br/>
        <button onClick={btnClick}>Count</button> <br/>
        age : {age} 
        </>
    );
}
export default UseStateCounter;