import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { logOutUser } from '../api/firebase'

export default function Header(){

    const navigate = useNavigate()

    const handleLogOut = async () => {
        logOutUser()
        navigate('/login')
        console.log ('logged out')
    }

    return(
        <header>
            <NavLink to='/'>#VanLife</NavLink>
            <nav>
                <NavLink to='/host' 
                    className={({isActive}) => isActive ? "active-link" : "" }>Host</NavLink>
                <NavLink to='/about' 
                    className={({isActive}) => isActive ? "active-link" : "" }>About</NavLink>
                <NavLink to='/vans'
                    className={({isActive}) => isActive ? "active-link" : "" }>Vans</NavLink>

                <NavLink to='/login'
                className={({isActive}) => isActive ? "active-link" : "" }>Login</NavLink>

                <button onClick={handleLogOut}>X</button>
                
            </nav>

        </header>
    )
}