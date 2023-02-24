import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function VanDetail(){

    const params = useParams()
    const [van, setVan] = useState(null)

    useEffect(() => {
        fetch(`/api/vans/${params.id}`)
        .then(res => res.json())
        .then(data => setVan(data.vans))
    },[params.id])
   
    return(
        <section>
         <Link to='/vans'>Back to all vans</Link>
        {van 
        ? (<div>
            <img src={van.imageUrl}/>
            <p>{van.type}</p>
            <h2>{van.name}</h2>
            <p>{van.description}</p>
            <p>${van.price}/day</p>
            <Link to=''>Rent this van</Link>
          </div>)
        : <h2>Loading</h2>
      }
        </section>
    )

}
