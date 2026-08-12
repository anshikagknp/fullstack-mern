function Comp4(){
    let  myCss = {
        backgroundColor: 'navy',
        color: 'skyblue',
        textAlign: 'center',
        lineHeight: '80px',
        boxShadow: '0 5px 8px grey'
    }

    return (
        <>
        <h1 style={myCss} align='center'>Component 4</h1>
        <p style={
            {
                backgroundColor: "red",
                color: "white",
                textAlign: "center",
                lineHeight: "50px",
                fontSize: "30px",
                padding: "20px"
            }}>
            Anshika this side, say hiii to me
        </p>

        <p className="alert alert-danger">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam quam accusantium sint porro tenetur deserunt quas ratione, alias explicabo, nihil odio necessitatibus id delectus facilis.
        </p>
        </>    
    );
}
export default Comp4