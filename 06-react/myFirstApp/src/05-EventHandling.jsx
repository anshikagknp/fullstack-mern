function Comp5(){
    let  myCss = {
        backgroundColor: 'navy',
        color: 'skyblue',
        textAlign: 'center',
        lineHeight: '80px',
        boxShadow: '0 5px 8px grey'
    }
    function myfun(){
        alert("Hello...");
    }
    function myfun2(name){
        alert("Welcome "+name);
    }
    return(
        <>
            <h1 style={myCss} align='center'>Component 5</h1>
            <button onClick={myfun} className="btn btn-warning">
                Click
            </button>
            <button onClick={() => {
                myfun2("Anshika");
            }} className="btn btn-danger">
                try me
            </button>
        </>
    );
}
export default Comp5;