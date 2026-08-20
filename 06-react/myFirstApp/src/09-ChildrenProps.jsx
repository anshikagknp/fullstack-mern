
function ChildComponent({name, age, children})    //OR props
{
    //console.log(props);  
    return (
        <>
        <h1 align="center">Child Component</h1>
        {/* {props.name}; */}
        {name}
        {age}
        {children}
        </>
    );
}
function Comp9(){
    return (
        <>
            <h1 align="center">Component 9</h1>
            <ChildComponent age={34} name={"Virat"}>
                <p>Lorem ipsum dolor sit amet.</p>
                <button>Button</button>
            </ChildComponent>
        </>
    );
}
export default Comp9;