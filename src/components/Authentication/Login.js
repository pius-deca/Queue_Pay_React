import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { authContext } from "../../auth-context/authProvider";

function Login() {
    const { loginUsers } = useContext(authContext);
    const history = useHistory();
    const [state, setstate] = useState({
        email: "",
        password: ""
    });

    const handleInput = ({ target: { name, value } }) => {
        setstate({
        ...state,
        [name]: value
        });
    };
    
    const handleLogin = e => {
        e.preventDefault();
        loginUsers(state, history);
    };
    console.log(state);  
    
    return (
        <div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h3 className="diaplay-4 text-center">Login here</h3>
                        <br />
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    name="email"   
                                    onChange={handleInput}                                 
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    name="password"
                                    onChange={handleInput}                                    
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