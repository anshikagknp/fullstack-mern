// function Logout(){
//     return(
//         <>
//         <p align="center">Please Login</p>
//         <button>Login</button>
//         </>
//     );
// }

// function Login(){
//     return(
//         <>
//         <p align="center">Welcome User</p>
//         <button>Logout</button>
//         </>
//     );
// }

function Comp7(){
    let  myCss = {
        backgroundColor: 'navy',
        color: 'skyblue',
        textAlign: 'center',
        lineHeight: '80px',
        boxShadow: '0 5px 8px grey'
    }

    let isLoggedIn = false;

    let arr= ["Anshika", "Awasthi", "Virat", "Abhay"]

    return(
        <>
        <h1 style={myCss} align='center'>Component 7</h1>
        {arr.length >0 && arr.map((ele) => <p>{ele}</p>)}

        {
            isLoggedIn ? <h3>Welcome User</h3> : <h3>Please Login</h3>
        }
        {
            isLoggedIn ? <button>Logout</button> : <button>Login</button>
            // isLoggedIn ?  <Login/> : <Logout/>
        }
        </>
    );
}
export default Comp7;