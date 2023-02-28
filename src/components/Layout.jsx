import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function Layout(){
    return(
        <div className='main-wrapper'>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
        
    )
}