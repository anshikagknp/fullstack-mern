import {useState} from "react";

function FormHandling()
{
    const [formData, setFormData] = useState({});

    function inputHandler(event)
    {
        setFormData({ ...formData, [event.target.name] : event.target.value});
        // console.log(formData);
    }

    function formHandler(event)
    {
        event.preventDefault();
        // console.log(formData);
        // API Calling
    }

    return (
        <>
        <h1 align="center">Component 15</h1>
        <form onSubmit={(event) => formHandler(event)}>
        <table className="table table-bordered w-50 mx-auto">
            <tbody>
                <tr>
                    <td>UserName</td>
                    <td>
                        <input 
                            type="text"
                            name="unm"
                            onChange={(event) => inputHandler(event)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td>
                        <input 
                            type="password"
                            name="pwd"
                            onChange={(event) => inputHandler(event)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>
                        <input 
                            type="email"
                            name="mailID"
                            onChange={(event) => inputHandler(event)}
                        />
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} align="center">
                        <button align="center">Submit</button>
                    </td>   
                </tr>
            </tbody>
        </table>
        </form>
        </>
    );
}
export default FormHandling;