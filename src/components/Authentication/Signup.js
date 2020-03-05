import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { authContext } from "../../auth-context/authProvider";
import classnames from 'classnames';

function SignUp() {
  const { addUsers } = useContext(authContext);
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
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h3 className="diaplay-4 text-center">Register here</h3>
            <br />
            <form onSubmit={handleSignUp}>
              <div className="form-group">
                <input
                  type="text"
                  className={classnames("form-control")}
                  placeholder="Enter Full Name"
                  name="fullName"
                  onChange={handleInput}
                />
              </div>
              <div className="form-group">
                <input
                  type="phone"                  
                  className="form-control"
                  placeholder="Enter Phone Number"
                  name="phoneNumber"
                  onChange={handleInput}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  name="email"
                  onChange={handleInput}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  name="password"
                  onChange={handleInput}
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  className="btn btn-lg btn-block btn-outline-success mt-4"
                />
                <p className="mt-4">
                  <Link to="/Login">Click here </Link> If you already have an
                  account
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
