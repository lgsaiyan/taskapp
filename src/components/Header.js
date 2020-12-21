import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className="ui secondary pointing menu">
            <Link to="/" className="item">
                <h2>Tasks</h2>
            </Link>
            <Link to="/about" className="item">
                <h2>About</h2>
            </Link>
            <div className="right menu logo">
                <h1 className="logo">task app</h1>
            </div>
        </div>
    )
}

export default Header