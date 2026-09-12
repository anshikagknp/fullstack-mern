import { Outlet } from "react-router-dom";
import MyNavBar from "../components/MyNav";

function AdminDashBoard(){

    return(
        <>
        <MyNavBar />
        <h1 align="center">Admin Dashboard</h1>
        <Outlet />
        </>
    );
}

export default AdminDashBoard;
