import React from 'react'
import {Navigate} from 'react-router-dom'

const PrivateComp = () => {
    const auth = localStorage.getItem('user');
    return auth ? <Navigate to='/starter'/> : <Navigate to='/login'/>
  
}

export default PrivateComp