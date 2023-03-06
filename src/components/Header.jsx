import React, {useContext} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { logOutUser } from '../api/firebase'
import AuthContext from '../components/AuthContext'

export default function Header(){

    const navigate = useNavigate()

    const handleLogOut = async () => {
        logOutUser()
        navigate('/login')
        console.log ('logged out')
    }
    const {user} = useContext(AuthContext)

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
                className={({isActive}) => isActive ? "active-link" : "" }><span className="material-symbols-outlined">
                account_circle
                </span></NavLink>

                {(user) &&
                <span className="material-symbols-outlined logout-icon" onClick={handleLogOut}>logout
                </span>
                }
                
            </nav>

        </header>
    )
}