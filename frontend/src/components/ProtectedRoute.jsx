import React, {useContext} from 'react'
import { Outlet } from 'react-router';
import AuthContext from '../context/AuthContext.js';

function ProtectedRoute() {
    const {user} = useContext(AuthContext);

    if(user){
        return <Outlet></Outlet>
    }
}

export default ProtectedRoute