import React, { useContext } from 'react'
import AuthContext from './AuthContext'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

export default function AuthRequired(){

    const {user} = useContext(AuthContext)
    console.log(user)
   
    const location = useLocation()

    if(!user){
       return <Navigate 
                to='/login' 
                state={{message: "You must login first.", 
                        from: location.pathname}}
                replace />
    }

    return <Outlet/>
    
    
}