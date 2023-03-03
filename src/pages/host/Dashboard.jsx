import React, {Suspense} from 'react'
import { Link, defer, useLoaderData, Await } from 'react-router-dom'
import { getHostVans } from '../../api/firebase'

export function loader(){
    return defer( { vans:getHostVans()})
}
export default function Dashboard(){

    const loaderData = useLoaderData()

    function renderVanElements(vans){
        const hostVanEls = vans.map(van => (
            <Link to={van.id} key={van.id}>
                <div key={van.id}>
                    <img src={van.imageUrl} alt={van.name}/>
                    <div>
                        <h3>{van.name}</h3>
                        <p>${van.price}/day</p>
                    </div>
                </div>
            </Link>
        ))
        return(
            <section>
            <h2>Your listed vans</h2>
            {hostVanEls}
            </section>
        )
    }
    return(
        <section>
            <h1>Host Dashboard</h1>  

            <section>
            <h2>Welcome!</h2>
            </section>

            <section>
            <h2>Your Reviews</h2>
            </section>

            <section>
                <Suspense  fallback={<h2>Loading vans...</h2>}>
                    <Await resolve={loaderData.vans}>
                        {renderVanElements}
                    </Await>
                </Suspense>
            </section>

         
            

        </section>
        
    )

}