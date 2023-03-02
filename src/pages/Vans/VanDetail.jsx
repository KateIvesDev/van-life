import React, { Suspense } from 'react'
import { Link, useLocation, defer, Await, useLoaderData } from 'react-router-dom'
//import { getVans } from '../../api'

export function loader( {params} ){
  return defer( { van: getVans(params.id)})
}

export default function VanDetail(){

    const dataPromise = useLoaderData()
    const location = useLocation()
    const search = location.state?.search || "";
    const type = location.state?.type || 'all';

    function renderVanDetail(van){
      return(
        <div>
          <img src={van.imageUrl}/>
          <p>{van.type}</p>
          <h2>{van.name}</h2>
          <p>{van.description}</p>
          <p>${van.price}/day</p>
          <Link to=''>Rent this van</Link>
        </div>
      )
    }

    return(
        <section>
         <Link to={`..${search}`}
          relative='path'>Back to {type} vans </Link>
          <Suspense fallback={<h2>Loading...</h2>}>
            <Await resolve={dataPromise.van}>
              {renderVanDetail}
            </Await>
          </Suspense>
        </section>
    )

}
