import React from 'react'
import { Suspense } from 'react'
import { Link, useSearchParams, useLoaderData, Await, defer } from 'react-router-dom'
import { getVans } from '../../api'

export function loader(){
    return defer( {vans: getVans()} )
}

export default function Vans(){

    const [ searchParams, setSearchParams ] = useSearchParams()
    const dataPromise = useLoaderData()

    const typeFilter = searchParams.get('type')

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


    function renderVanElements(vans){
        const filteredVans = typeFilter ? vans.filter(van => van.type.toLowerCase() === typeFilter) : vans

        const vanElements = filteredVans.map(van => (
                <div key={van.id} className='van-list-item'>
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
            ))
            return (
                <>
                <section className='van-filter-button-wrapper'>
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
                <section className='van-list-wrapper'>
                    {vanElements}
                </section>
                </>
            )
    }

     return(
        <section>
            <h1>Explore our van options</h1>
            <Suspense fallback={<h2>Loading...</h2>}>
                <Await resolve={dataPromise.vans}>
                {renderVanElements}
                </Await>
            </Suspense>
        </section>
    )
}



