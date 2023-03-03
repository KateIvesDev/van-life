import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useState, useEffect } from 'react'
import AuthContext from '../components/AuthContext'

const auth = getAuth()

// eslint-disable-next-line react/prop-types
export const AuthProvider = ( {children} ) => {
    const [user, setUser] = useState(null)
    useEffect(()=> {
        onAuthStateChanged(auth, (user) => {
            setUser(user)
        })
    }, [])
    return (
        <AuthContext.Provider value = {{user}}>{children}</AuthContext.Provider>
    )
}