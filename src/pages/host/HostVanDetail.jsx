import React, { Suspense } from 'react'
import { defer, Await, useLoaderData } from 'react-router-dom'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { getHostVans } from '../../api'

export function loader( {params} ){
    return defer( { van: getHostVans(params.id)})
}

export default function HostVanDetail(){

    const dataPromise = useLoaderData()

    function renderHostVanDetail(currentVan){
        const activeStyles = {
            fontWeight: 'bold',
            textDecoration: 'underline',
            color: '#161616',
         }
        
        return(
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
        )
    }

    return(
        <section>
            <Link to='..'
            relative='path'>Back to all Views</Link>
            <Suspense fallback={<h1>Loading...</h1>}>
                <Await resolve={dataPromise.van}>
                    {renderHostVanDetail}
                </Await>
            </Suspense>
        </section>
       
    )
}