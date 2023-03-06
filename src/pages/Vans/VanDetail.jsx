import React, { Suspense } from 'react'
import { Link, useLocation, defer, Await, useLoaderData } from 'react-router-dom'
//import { getVans } from '../../api'
import { getVan } from '../../api/firebase'

export function loader( {params} ){
  return defer( { van: getVan(params.id) })
}

export default function VanDetail(){
    const location = useLocation()
    const dataPromise = useLoaderData()
   
    const type = location.state?.type || 'all';
    const search = location.state?.search || "";

    return(
        <section>
         <Link to={`..${search}`}
          relative='path'>Back to {type} vans </Link>
          <Suspense fallback={<h2>Loading...</h2>}>
            <Await resolve={dataPromise.van}>
              {(van) => (
                  <div className='van-detail-wrapper'>
                    <img src={van.imageUrl}/>
                    <div>
                      <span className={van.type}>{van.type}</span>
                      <h2>{van.name}</h2>
                      <p>${van.price}/day</p>
                      <p>{van.description}</p>
                    </div>
                    
                    <Link to='' className='main-btn'>Rent this van</Link>
                  </div>
              )}
            </Await>
          </Suspense>
        </section>
    )

}
