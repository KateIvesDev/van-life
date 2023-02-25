import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function HostVanDetail(){

    const {id } = useParams()

    const [currentVan, setCurrentVan] = useState(null)

    useEffect(()=> {
        fetch(`/api/host/vans/${id}`)
        .then(res => res.json())
        .then(data => setCurrentVan(data.vans))
    }, [])

    

    return(
        <section>
            <Link to='/host/vans'>Back to all Views</Link>
        
               {!currentVan ? <h1>Loading...</h1> :
                <div key={currentVan.id} width={150} >
                    <img src={currentVan.imageUrl}></img>
                    <h2>{currentVan.name}</h2> 
                    <p>${currentVan.price}/day</p>
                    <nav>Details Pricing Photos </nav>
                        <div>
                            <h3>Name: {currentVan.name}</h3>
                            <h3>Category: {currentVan.type}</h3>
                            <p>Description: {currentVan.description} </p>
                            <h3>Visibility: Public</h3>
                        </div>
                </div>
                }
        </section>
       
    )
}