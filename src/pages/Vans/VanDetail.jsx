import React, { useState, useEffect } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'

export default function VanDetail(){

    const params = useParams()
    const location = useLocation()
    const [van, setVan] = useState(null)


    useEffect(() => {
        fetch(`/api/vans/${params.id}`)
        .then(res => res.json())
        .then(data => setVan(data.vans))
    },[params.id])
   
    const search = location.state?.search || "";
    const type = location.state?.type || 'all';

  
    return(
        <section>
         <Link to={`..${search}`}
          relative='path'>Back to {type} vans </Link>
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
