import { useState } from "react";
import api from "../api";

function AddUser(){

    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState("");

    function inputfun(event){
        setFormData({...formData, [event.target.name]: event.target.value});
    }

    async function formSubmit(event){
        try{
            event.preventDefault();
            console.log(formData);
            // API Calling...
            const res = await api.post("/admin/add", formData);
            // console.log(res);
            setMessage(res.data.message);
            event.target.reset();
        }catch(err){
            console.log(err);
        }
    }

    return(
        <>
        <h1 align="center">Add New User</h1>
        <hr color="navy" />
        <form onSubmit={(event)=>formSubmit(event)}>
            <table className="table table-bordered w-75 mx-auto">
                <tbody>
                    <tr>
                        <td>Enter Name</td>
                        <td>
                            <input type="text" onChange={(event)=>{inputfun(event);}} name="unm" />
                        </td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td>
                            <input type="password" onChange={(event)=>{inputfun(event);}} name="pwd" />
                        </td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>
                            <input type="email" onChange={(event)=>{inputfun(event);}} name="mailId" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button type="submit">Submit</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            {message && <div className="alert alert-success text-center">{message}</div>}
        </form>
        </>
    );
}

export default AddUser;
