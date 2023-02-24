import React from 'react'

export default function Footer(){

    const currentYear = new Date().getFullYear()
    return (

        <footer>
            <p>Copyright {currentYear} #VANLIFE</p>
        </footer>
    )
}