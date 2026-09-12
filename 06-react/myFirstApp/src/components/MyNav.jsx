import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import api from "../api";

function MyNavBar(){

    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const {user, setUser} = authContext;

    const logOut = async () => {
        try{
            await api.post("/logout");
            navigate("/login", {replace: true});
        }catch(err){
            console.log("Logout Failed with Error:" + err);
        }finally{
            setUser(null);
        }
    };

    return(
        <>
        <nav className="navbar navbar-expand-md badge-dark navbar-dark">
            <img className="navbar-brand" src="" />

            <button className="navbar-toggler" data-toggle="collapse" data-target="#myNav">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="myNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/admin">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="show">Show Users</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="addUser">Add User</Link>
                    </li>

                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" data-toggle="dropdown" to="#">Link 3</Link>

                        <div className="dropdown-menu">
                            <Link className="dropdown-item" to="">Sub Link 1</Link>
                            <Link className="dropdown-item" to="">Sub Link 2</Link>
                            <Link className="dropdown-item" to="">Sub Link 3</Link>
                        </div>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="#">Link 4</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#">Link 5</Link>
                    </li>
                </ul>

                {user && <span>Welcome {user.userName}</span>}
                <button onClick={logOut} className="btn btn-sm btn-danger ml-3">Logout</button>
            </div>
        </nav>
        </>
    );
}

export default MyNavBar;
