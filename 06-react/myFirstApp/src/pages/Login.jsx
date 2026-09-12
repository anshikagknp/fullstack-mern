import { useContext, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

function Login(){

    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const authContext = useContext(AuthContext);
    const {user, setUser} = authContext;

    function inputfun(event){
        setFormData({...formData, [event.target.name]: event.target.value});
    }

    async function formSubmit(event){
        try{
            event.preventDefault();
            console.log(formData);
            // API Calling...
            const res = await api.post("/login", formData);

            setUser(res.data.data);
            const role = res.data.data.userRole;
            if(role === "admin"){
                // Redirect to Admindashboard
                navigate("/admin"); // navigate(route)
            }else if(role === "user"){
                // Redirect to UserDashboard
            }

            setMessage(res.data.message);
            event.target.reset();
        }catch(err){
            setMessage(err.response.data.message);
        }
    }

    return(
        <>
        <h1 align="center">Login Page</h1>
        <hr color="navy" />
        <form onSubmit={(event)=>formSubmit(event)}>
            <table className="table table-bordered w-75 mx-auto">
                <tbody>
                    <tr>
                        <td>Email</td>
                        <td>
                            <input type="email" onChange={(event)=>{inputfun(event);}} name="mailId" />
                        </td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td>
                            <input type="password" onChange={(event)=>{inputfun(event);}} name="pwd" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button type="submit">Login</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            {message && <div className="alert alert-success text-center">{message}</div>}
        </form>
        </>
    );
}

export default Login;
