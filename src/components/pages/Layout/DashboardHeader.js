import React from 'react'
import { Link } from 'react-router-dom'

function DashboardHeader() {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-success mb-4"> 
           <div className="container">
                <Link className="navbar-brand" to="/Dashboard">
                    <h2>Queue Pay</h2>
                </Link> 
                <button className="navbar-toggler" type="button" data-toggler="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon" />
                </button>
                
                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/Dashboard">
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/Cashout">
                                Cashout
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Transactions">
                                Transactions
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Analytics">
                                Analytics
                            </Link>
                        </li>                        
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Log out
                            </Link>
                        </li>
                    </ul>
                </div>
           </div>
        </nav>
    )
}

export default DashboardHeader
