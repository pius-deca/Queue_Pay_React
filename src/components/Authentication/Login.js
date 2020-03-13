import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { authContext } from "../../auth-context/authProvider";
import classnames from 'classnames';

function Login() {
    
    const { loginUsers, errors, dispatch } = useContext(authContext);

    const history = useHistory();

    const [state, setstate] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        dispatch({type:"REMOVE_ERROR"})
        localStorage.clear();
    }, [])

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
    
    return (
        <div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h3 className="diaplay-4 text-center">Login here</h3>
                        <br />
                        <form onSubmit={handleLogin} className="was-validated">
                            <div className="form-group">
                                <input
                                type="email"
                                className={classnames("form-control", {
                                    "is-invalid":errors
                                })}
                                placeholder="Enter Email"
                                name="email"
                                onChange={handleInput}
                                />
                                {errors ?
                                <div className="invalid-feedback text-left">{errors.data.email}</div>
                                : <div class="valid-feedback">Looks good!</div>
                                }
                            </div>
                            <div className="form-group">
                                <input
                                type="password"
                                className={classnames("form-control", {
                                    "is-invalid":errors
                                })}
                                placeholder="Enter Password"
                                name="password"
                                onChange={handleInput}
                                />                
                                {errors ?
                                <div className="invalid-feedback text-left">{errors.data.password}</div>
                                : <div class="valid-feedback">Looks good!</div>
                                }
                            </div>
                            <div className="form-group">
                                <input 
                                    type="submit"
                                    className="btn btn-lg btn-block btn-outline-success mt-4"
                                />
                                <p className="mt-4">
                                    <Link to="/Signup">Click here </Link> If you dont have an account
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>            
        </div>
    )
}

export default Login;