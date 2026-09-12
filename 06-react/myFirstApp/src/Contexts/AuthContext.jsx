import { createContext, useState, useEffect } from "react";
import api from "../api";

export const AuthContext = createContext();

export function AuthProvider({children}){

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getUser(){
        try{
            const res = await api.get("/me");
            setUser(res.data.data);
        }catch(err){
            setUser(null);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        getUser();
    }, [])

    return(
        <>
        <AuthContext.Provider value = {{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
        </>
    );
}
