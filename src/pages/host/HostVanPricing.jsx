import React from 'react'
import { useOutletContext } from 'react-router-dom'

export default function HostVanPricing(){

    const { currentVan } = useOutletContext()

    return(
        <section>
        <h3>${currentVan.price}/day</h3>
       
    </section>
    )
}