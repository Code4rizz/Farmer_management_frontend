import React from "react";
import {Navigate} from "react-router-dom";

const PrivateRoute = ({children,allowedrole}) => {
    const user =JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if(!user || !token){
        return <Navigate to="/login" replace/>
    }
    if(allowedrole && !allowedrole.includes(user.role)){
        return <Navigate to="/" replace/>
    }
    return children;
};
export default PrivateRoute;