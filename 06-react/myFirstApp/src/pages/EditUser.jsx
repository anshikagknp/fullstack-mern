import { useEffect, useState } from "react";
import api from "../api";
import { useParams } from "react-router-dom";

function EditUser(){

    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState("");
    const params = useParams();

    function inputfun(event){
        setFormData({...formData, [event.target.name]: event.target.value});
    }

    async function formSubmit(event){
        try{
            event.preventDefault();
            console.log(formData);
            // API Calling...
            const res = await api.put(`/admin/user/${params.id}`, formData);  // Fixed: was missing leading /
            // console.log(res);
            setMessage(res.data.message);
            event.target.reset();
        }catch(err){
            setMessage(err.response.data.message);
        }
    }

    async function fetchUser(){
        try{
            const {id} = params;
            const res = await api.get(`/admin/user/${id}`);
            setFormData(res.data.data);
        }catch(err){
            console.error("Failed to fetch user:", err);
            setMessage(err?.response?.data?.message || "Failed to load user data.");
        }
    }

    useEffect(()=>{
        fetchUser();
    }, [])

    return(
        <>
        <h1 align="center">Edit User</h1>
        <hr color="navy" />
        <form onSubmit={(event)=>formSubmit(event)}>
            <table className="table table-bordered w-75 mx-auto">
                <tbody>
                    <tr>
                        <td>Enter Name</td>
                        <td>
                            <input type="text" onChange={(event)=>{inputfun(event);}} name="unm" defaultValue={formData.userName} readOnly />
                        </td>
                    </tr>

                    <tr>
                        <td>Email</td>
                        <td>
                            <input type="email" onChange={(event)=>{inputfun(event);}} name="mailId" defaultValue={formData.userEmail} />
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

export default EditUser;
