import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { authContext } from "../../auth-context/authProvider";
import classnames from 'classnames';
import Header from "./Layout/Header";

function SignUp() {
  const { addUsers, auth_errors } = useContext(authContext);
  const history = useHistory();
  const [state, setstate] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: ""
  });

  const handleInput = ({ target: { name, value } }) => {
    setstate({
      ...state,
      [name]: value
    });
  };
  const handleSignUp = e => {
    e.preventDefault();
    addUsers(state, history);
  };

  return (
    <div className="signup">
      <Header />
      <div className="container">      
        <div className="row">
          <div className="col-md-8 m-auto">
            <h3 className="diaplay-4 text-center">Register here</h3>
            <br />
            <form onSubmit={handleSignUp}>
              <div className="form-group">
                <input
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid":auth_errors
                  })}
                  placeholder="Enter Full Name"
                  name="fullName"
                  onChange={handleInput}
                />
                {auth_errors && (
                  <div className="invalid-feedback text-left">{auth_errors.data.fullName}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="phone"                  
                  className={classnames("form-control", {
                    "is-invalid":auth_errors
                  })}
                  placeholder="Enter Phone Number"
                  name="phoneNumber"
                  onChange={handleInput}
                />
                {auth_errors && (
                  <div className="invalid-feedback text-left">{auth_errors.data.phoneNumber}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className={classnames("form-control", {
                    "is-invalid":auth_errors
                  })}
                  placeholder="Enter Email"
                  name="email"
                  onChange={handleInput}
                />
                {auth_errors && (
                  <div className="invalid-feedback text-left">{auth_errors.data.email}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className={classnames("form-control", {
                    "is-invalid":auth_errors
                  })}
                  placeholder="Enter Password"
                  name="password"
                  onChange={handleInput}
                />                
                {auth_errors && (
                  <div className="invalid-feedback text-left">{auth_errors.data.password}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  className="btn btn-lg btn-block btn-outline-success mt-4"
                />
                <p className="mt-4">
                  Already registered?<Link to="/"> Click here </Link> to login in
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
