import React from 'react'
import { useOutletContext } from 'react-router-dom'

export default function HostVanInfo(){

    const { currentVan } = useOutletContext()

    return(
        <section>
            <h3>Name: {currentVan.name}</h3>
            <h3>Category: {currentVan.type}</h3>
            <p>Description: {currentVan.description}</p>
            <h3>Visibility: Public</h3>
        </section>
    )
}