import React from 'react'
import { useState } from 'react'
import { Link, useSearchParams, useLoaderData } from 'react-router-dom'
import { getVans } from '../../api'

export function loader(){
    return getVans()
}

export default function Vans(){

    const [ searchParams, setSearchParams ] = useSearchParams()
    const [ error, setError ] = useState(null)

    const typeFilter = searchParams.get('type')

    const vans = useLoaderData()
   
    const filteredVans = typeFilter ? vans.filter(van => van.type.toLowerCase() === typeFilter) : vans

    const vanElements = filteredVans.map(van => {
        return(
            <div key={van.id}>
                <Link to={van.id} 
                    state={{ 
                        search: `?${searchParams.toString()}`,
                        type: typeFilter
                    }}>
                    <img src={van.imageUrl}/>
                    <h2>{van.name}</h2>
                    <p>${van.price}/day</p>
                    <span>{van.type}</span>
                </Link>
            </div>
        )
    })

    function handleFilterChange(key,value){
        setSearchParams(prevParams => {
            if(value === null){
                prevParams.delete(key)
            } else {
                prevParams.set(key,value)
            }
            return prevParams
        })
    }

    if (error){
        return <h1>There was an error: {error.message}</h1>
    } 

     return(
        <section>
            <h1>Explore our van options</h1>
            <section>
                <button onClick={() => handleFilterChange('type', 'simple')} className={
                    `${typeFilter === "simple" ? "selected" : ""}`}>Simple</button>
                <button onClick={() => handleFilterChange('type', 'rugged')} className={
                    `${typeFilter === "rugged" ? "selected" : ""}`}>Rugged</button>
                <button onClick={() => handleFilterChange('type', 'luxury')} className={
                    `${typeFilter === "luxury" ? "selected" : ""}`}>Luxury</button>
                {
                    typeFilter 
                    ? <button onClick={() => handleFilterChange('type', null)}>Clear Filters</button>
                    : null
                }
                
               
            </section>
            <section>
               {vanElements}
            </section>
        </section>
    )
}