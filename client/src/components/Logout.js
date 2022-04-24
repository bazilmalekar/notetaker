import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";

 const Logout = () => {
    const navigate = useNavigate();
    const callLogout = async() => {
        try{
            const res = await fetch("/logout", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }, 
                credentials: "include"
            });

            const data = await res.json();
            if(res.status === 200){
                navigate("/");
            }else{
                throw new Error(res.err);
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        callLogout();
    }, []);
     return(
         <>
         <p>Logout page</p>
         </>
     );
 }

 export default Logout;