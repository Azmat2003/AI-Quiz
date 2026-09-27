import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext.js'
import { Navigate, Outlet } from 'react-router'

function CheckUser() {
    const {user} = useContext(AuthContext);

    if(user){
        <Navigate to={'/'} replace></Navigate>
    }
    else{
        return <Outlet></Outlet>
    }

}

export default CheckUser