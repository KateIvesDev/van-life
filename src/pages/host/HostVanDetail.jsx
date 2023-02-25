import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link, NavLink, Outlet } from 'react-router-dom'

export default function HostVanDetail(){

    const {id } = useParams()

    const [currentVan, setCurrentVan] = useState(null)

    useEffect(()=> {
        fetch(`/api/host/vans/${id}`)
        .then(res => res.json())
        .then(data => setCurrentVan(data.vans))
    }, [])

    const activeStyles = {
        fontWeight: 'bold',
        textDecoration: 'underline',
        color: '#161616',
     }
    

    return(
        <section>
            <Link to='..'
            relative='path'>Back to all Views</Link>
        
               {!currentVan ? <h1>Loading...</h1> :
                <div key={currentVan.id} width={150} >
                    <img src={currentVan.imageUrl}></img>
                    <h2>{currentVan.name}</h2> 
                    <p>${currentVan.price}/day</p>

                    <div>
                        <nav>
                            <NavLink to='.' end style={({isActive}) => isActive ? activeStyles : null }>Details</NavLink>
                            <NavLink to='pricing' style={({isActive}) => isActive ? activeStyles : null }>Pricing</NavLink>
                            <NavLink to='photos' style={({isActive}) => isActive ? activeStyles : null }>Photos</NavLink>
                        </nav>
                        <Outlet context={ {currentVan} }/>
                    </div>
                </div>
                }
        </section>
       
    )
}