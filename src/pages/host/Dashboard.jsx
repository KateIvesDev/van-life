import React, {Suspense} from 'react'
import { Link, defer, useLoaderData, Await } from 'react-router-dom'
import { getHostVans, getHost } from '../../api/firebase'

export function loader(){
    return defer( { vans:getHostVans(), user: getHost()} )
}

export default function Dashboard(){

    const loaderData = useLoaderData()

   
    function renderHost(user){
    
        return( 
            <h2>Welcome {user.firstName}!</h2>
        )
    }

    function renderVanElements(vans){
        const hostVanEls = vans.map(van => {
            let url = '/host/vans/'+ van.id
            return(
            <Link to={url} key={van.id}>
                <div key={van.id} className='van-list-item-wrapper'>
                    <img src={van.imageUrl} alt={van.name}/>
                    <div className='van-list-item-text'>
                        <h3>{van.name}</h3>
                        <p>${van.price}/day</p>
                    </div>
                    <Link to={url}>Edit</Link>
                </div>
            </Link>
            )
            }
        )
        return(
            <section className='listed-van-wrapper'>
            <h2>Your listed vans</h2>
            {hostVanEls}
            </section>
        )
    }
    return(
        <section>
            <Suspense fallback={<h2>Welcome!</h2>}>
                <Await resolve={loaderData.user}>
                    {renderHost}
                </Await>
            </Suspense>

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