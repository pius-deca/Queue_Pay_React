import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-success mb-4"> 
           <div className="container">
                <Link className="navbar-brand" to="/">
                    <h2>Queue Pay</h2>
                </Link> 
                <button className="navbar-toggler" type="button" data-toggler="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon" />
                </button>
                
                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/Signup">
                                Sign up
                            </Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
           </div>
        </nav>
    )
}

export default Header;