import React, { useContext } from 'react'

import AuthContext from '../context/AuthContext.js'
import LoggedInNavbar from './LoggedInNavbar.jsx';
import LoggedOutNavbar from './LoggedOutNavbar.jsx';


function Navbar() {
    const {user} = useContext(AuthContext);

    if(user){
        return <LoggedInNavbar></LoggedInNavbar>
    }
    else{
        return <LoggedOutNavbar></LoggedOutNavbar>
    }
}

export default Navbar