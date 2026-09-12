import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({children, role}){

    const authContext = useContext(AuthContext);
    const {user, loading} = authContext;

    if(loading) return <h2 align="center" className="spinner-border"></h2>;

    if(!user) return <Navigate to="/login" replace />;

    if(user && user.userRole !== role) return <Navigate to="/login" replace />;

    // User logged in and have correct role
    return children;
}

export default ProtectedRoutes;
