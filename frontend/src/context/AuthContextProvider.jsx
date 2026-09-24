import React, { useEffect, useState } from "react";

import AuthContext from "./AuthContext.js";
import { useNavigate } from "react-router";

function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const getProfile = async () => {
        try {
          console.log("Running getProfile");
            const api = `${import.meta.env.VITE_BACKEND_BASE_URL}/user/profile`;
            const options = {
                method: "GET",
                credentials: "include" // include cookies
            };
            const res = await fetch(api, options);
            const data = await res.json();

            if (!res.ok) {
                // some error
                throw new Error("Fetch failed");
            }
            if (data) {
                setUser(data.user);
                console.log(user);
            }
        } catch (err) {
            setUser(null);
        }
    };

    useEffect(()=>{
      getProfile();
    }, []);

    async function logout(){
        console.log("logging out");
        try{
            console.log("start");
            
            const api = `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/logout`;
            const res = await fetch(api, {
                method : "POST",
                credentials : "include"
            })

            console.log("Make logout call")

            if(!res.ok){
                throw new Error("Logging Out");
            }

            setUser(null);
            navigate('/');
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                getProfile,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
