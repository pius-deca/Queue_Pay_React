import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { authContext } from '../../auth-context/authProvider';

function Header() {
    const history = useHistory();
    const {isAuthenticated, dispatchRed} = useContext(authContext)

    const logout = (e) =>{
        e.preventDefault();
        dispatchRed({'type':'LOGOUT'})
        delete localStorage['auth'];
        history.push('/')
    }
    const authenticationLinks = (
        <React.Fragment>
            <div className="container">
                <Link className="navbar-brand" to="/Dashboard">
                    <h2>Queue Pay</h2>
                </Link> 
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/Dashboard">
                            Dashboard
                        </Link>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
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
                        <a href='/' className="nav-link" onClick={logout}>
                            Log out
                        </a>
                    </li>
                </ul>
            </div>
        </React.Fragment>    
    )

    const guestLinks =(
        <React.Fragment>
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <h2>Queue Pay</h2>
                </Link> 
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
        </React.Fragment>
    )

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-success mb-4"> 
           
                <button className="navbar-toggler" type="button" data-toggler="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon" />
                </button>
                
                <div className="collapse navbar-collapse" id="mobile-nav">
                    {isAuthenticated ? authenticationLinks : guestLinks}
                </div>
        </nav>
    )
}

export default Header;