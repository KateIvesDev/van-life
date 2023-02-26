import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function HostVans(){

    const [hostVans, setHostVans] = useState([])

    useEffect(() => {

        fetch('/api/host/vans')
        .then(res => res.json())
        .then(data => setHostVans(data.vans))
    })

    const hostVanEl = hostVans.map(van => {
        return(

            <Link to={van.id} key={van.id}>
                <div key={van.id}>
                <img src={van.imageUrl}/>
                <h2>{van.name}</h2>
                <p>${van.price}/day</p>
                </div>
            </Link>
        )
    })

    return(
        <section>
            <h1>Your listed vans</h1>

            <section>
                {hostVanEl.length > 0 ? hostVanEl :<h2>Loading...</h2>}
            </section>
        </section>
        
    )
}