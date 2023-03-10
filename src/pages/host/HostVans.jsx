import React, { Suspense } from 'react'
import { Link, Await, defer, useLoaderData } from 'react-router-dom'
//import { getHostVans } from '../../api'
import { getHostVans } from '../../api/firebase'

export function loader(){
    return defer( {vans: getHostVans()} )
}

export default function HostVans(){

    const dataPromise = useLoaderData()
    function renderHostVanElements(vans){

        const hostVanEl = vans.map(van => {

            return(
                <div key={van.id} className='van-list-row-wrapper'>
                <Link to={van.id} key={van.id} className='van-list-item-wrapper'>
                    <img src={van.imageUrl}/>
                    <div className='van-list-item-text'>
                        <h2>{van.name}</h2>
                        <p>${van.price}/day</p>
                    </div>   
                </Link>
                </div>
            )
        })

        return(
            <section>
                {hostVanEl}
            </section>
        )
    }

    return(
        <section>
            <h1>Your listed vans</h1>
            <Suspense fallback={<h2>Loading...</h2>}>
                <Await resolve={dataPromise.vans}>
                    {renderHostVanElements}
                </Await>
            </Suspense>
        </section>
    )
}