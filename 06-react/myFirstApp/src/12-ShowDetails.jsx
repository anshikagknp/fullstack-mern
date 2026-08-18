import { useParams } from "react-router-dom";
function ShowDetails(){
    // const params = useParams();
    // console.log(params);

    const {id} = useParams();

    return(
        <>
        <h1 align="center">Product Details</h1>
        { /* {params.id} */}
        {id}
        </>
    );
}
export default ShowDetails;