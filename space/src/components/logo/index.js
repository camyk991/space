import React from 'react'
import logo from './logo.png'
import './styl.css'

function Logo() {
    return (
        <div className="fadeinOut">
            <img className="logo" src={logo} alt="logo"/>
            <div className="background"></div>
        </div>
    )
}
export default Logo;