import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

export default function Vans(){

    const [vans, setVans] = useState([])

    const [ searchParams, setSearchParams ]  = useSearchParams()

    const typeFilter = searchParams.get('type')
    
    useEffect(() => {
        fetch('/api/vans')
        .then(res => res.json())
        .then(data => setVans(data.vans))
    },[])
   
    const filteredVans = typeFilter ? vans.filter(van => van.type.toLowerCase() === typeFilter) : vans

    const vanElements = filteredVans.map(van => {
        return(
            <div key={van.id}>
                <Link to={`/vans/${van.id}`}>
                    <img src={van.imageUrl}/>
                    <h2>{van.name}</h2>
                    <p>${van.price}/day</p>
                    <span>{van.type}</span>
                </Link>
            </div>
        )
    })

    return(
        <section>
            <h1>Explore our van options</h1>
            <section>
                <button onClick={() => setSearchParams({type: 'simple'})}>Simple</button>
                <button onClick={() => setSearchParams({type: 'rugged'})}>Rugged</button>
                <button onClick={() => setSearchParams({type: 'luxury'})}>Luxury</button>
                <button onClick={() => setSearchParams({})}>Clear Filters</button>
               
            </section>
            <section>
               {vanElements}
            </section>
        </section>
    )
}