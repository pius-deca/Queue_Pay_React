import React, { useContext,useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom'
import { authContext } from "../../auth-context/authProvider";

function Dashboard() {
  const [auth, setAuth] = useState({})
  const history = useHistory()
  if (!localStorage['auth']) {
    history.push("/");
  }
  const { business, isAuthenticated } = useContext(authContext);     

  useEffect(() => {
    if(isAuthenticated){
      const json = localStorage['auth'] ? JSON.parse(localStorage['auth']) : {}
      setAuth({...json})
    }
  },[isAuthenticated])

  return (
    <div className="container">
      <div className="card shadow p-3 mt-5 bg-white rounded">
        <div className="card-body">
            <div className="">
              <h5>
                <span>Merchant Name : </span>
                {auth.fullName}
              </h5>
            </div>
            <div className="">
              <h5>
                <span>Merchant Email : </span>
                {auth.email}
              </h5>
            </div>
            <div className="">
              <h5>
                <span>Merchant Phone Number : </span>
                {auth.phoneNumber}
              </h5>
            </div>
            <div className="">
              <h5>Merchant Businesses                
              </h5>
                {business.map((item) => {
                    return (                        
                    <ul className="mt-3">                    
                        <li>{item.name}</li>                 
                        <li>{item.description}</li> 
                        <li>
                          <Link to={item.logoUrl}>{item.logoUrl}</Link>                            
                        </li>  
                        <li>
                          <Link to={item.cacdocumentUrl}>{item.cacdocumentUrl}</Link>
                        </li>                
                    </ul>                    
                    );
                })}
            </div>
        </div>
      </div>
      
      <div className="row my-5">
        <div className="col-md-8 m-auto">
          <h3 className="diaplay-4 text-center">Register a business here</h3>
          <br />
          <form className="was-validated">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Business Name"
                name="name"
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="form-group">
              <input
                type="text" 
                className="form-control"
                placeholder="Enter logo link"
                name="logoUrl"
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="form-group">
              <input
                type="text" 
                className="form-control"
                placeholder="Enter CAC document link"
                name="CACDocumentUrl"
              />
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="form-group mt-3">
              <textarea
                type="text"
                className="form-control"
                placeholder="Enter Description"
                name="description"
              />              
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div class="form-group">
              <label>Select wallet type</label>
              <select className="form-control" name="walletType">
                <option>NAIRA</option>
                <option>DOLLAR</option>
                <option>GBP</option>
                <option>EURO</option> 
              </select>
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                placeholder="Enter Pin Number"
                name="pin"
              /> 
              <div className="valid-feedback">Looks good!</div>   
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Register Business"
                className="btn btn-outline-secondary btn-block btn-lg"
              />
            </div>           
          </form>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
