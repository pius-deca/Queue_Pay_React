import React from 'react'
// import { Link } from 'react-router-dom'

function Login() {
    return (
        <div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h3 className="diaplay-4 text-center">Login here</h3>
                        <br />
                        <form>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    name="email"                                    
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    name="password"                                    
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="submit"
                                    className="btn btn-lg btn-block btn-outline-success mt-4"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Login;