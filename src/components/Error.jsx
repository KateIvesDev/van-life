import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function Error(){
    const error = useRouteError()
    console.log(error)
    return(
        <>
        <h1>Error: {error.message}</h1>
        <p>{error.status} - {error.statusText}</p>
        </>
    )
}