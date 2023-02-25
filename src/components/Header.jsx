import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header(){


    return(
        <header>
            <NavLink to='/'>#VanLife</NavLink>
            <nav>
                <NavLink to='/host' 
                    className={({isActive}) => isActive ? "active-link" : "" }>Host</NavLink>
                <NavLink to='/about' 
                    className={({isActive}) => isActive ? "active-link" : "" }>About</NavLink>
                <NavLink to='/vans'
                    className={({isActive}) => isActive ? "active-link" : "" }>Van</NavLink>
            </nav>

        </header>
    )
}