import { useContext ,useEffect} from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { datacontext } from "../data provider/Dataprovider";


function ProtectedRoute({children,msg,redirect}) {

             const [{user},dispatch]=useContext(datacontext);


    const navigate=useNavigate();

    useEffect(()=>{


                  if(!user){
                    navigate("/signin",{state:{msg,redirect}})
                  }
             
    },[])
    return children
    
}

export default ProtectedRoute;