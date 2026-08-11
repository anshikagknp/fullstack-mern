function Comp3(){

    let name = "Anshika";
    let surname = "Gupta";
    //array renders completely
    let arr = ["Apple", "Banana", "Orange"];
    //objects are not rendered - not valid as react child
    let userData = {uid: 1001, unm: "Virat"};
    let a = [];
    arr.forEach((ele)=>{
        a.push(<li>{ele}</li>)
    });


    return (
        
        //fragment
        <>
        <h1 align='center'>Component3</h1>
        <p>
            {name}
            {surname}
            {arr}
            {arr[0]}
            {userData.uid}
            <ul>{a}</ul>
        </p>
        
        </>    
    );
}
export default Comp3