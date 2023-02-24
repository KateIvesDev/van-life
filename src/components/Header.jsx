import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(){

    return(
        <header>
            <Link to='/'>#VanLife</Link>
            <nav>
                <Link to='/host'>Host</Link>
                <Link to='/about'>About</Link>
                <Link to='/vans'>Van</Link>
            </nav>

        </header>
    )
}