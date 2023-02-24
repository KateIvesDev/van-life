import React from 'react'
import { useState, useEffect } from 'react'

export default function Vans(){

    const [vans, setVans] = useState([])

    useEffect(() => {
        fetch('/api/vans')
        .then(res => res.json())
        .then(data => setVans(data.vans))
    },[])
   

    const vanElements = vans.map(van => {
        return(
            <div key={van.id}>
            <img src={van.imageUrl}/>
            <h2>{van.name}</h2>
            <p>${van.price}/day</p>
            <span>{van.type}</span>
            </div>
        )
    })

    return(
        <section>
            <h1>Explore our van options</h1>
            <section>
               {vanElements}
            </section>
        </section>
    )
}