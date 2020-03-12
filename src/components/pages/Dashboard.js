import React, { useContext,useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom'
import { authContext } from "../../auth-context/authProvider";
import BusinessForm from "./BusinessForm";

function Dashboard() {
  const [auth, setAuth] = useState({})
  const history = useHistory()

  if (!localStorage['auth']) {
    history.push("/");
  }
  const { business, isAuthenticated, getAllBusiness, getAllWallets, getAnalytics, errors } = useContext(authContext);     
  
  useEffect(() => {
    if(isAuthenticated){
      const json = localStorage['auth'] ? JSON.parse(localStorage['auth']) : {}
      setAuth({...json}) 
      getAllBusiness();           
    }
  },[isAuthenticated])

  const getWallets = (e) => {
    e.preventDefault();
    localStorage.setItem("currentId", JSON.stringify(e.target.id));
    getAllWallets(history, e.target.id);  
  };

  const analytics = (e) => {
    e.preventDefault();
    localStorage.setItem("currentId", JSON.stringify(e.target.id));
    getAnalytics(history, e.target.id);  
  }; 

  const [state, setState] = useState(false)

  const displayBusinessForm = () => {    
    setState(true)
  }

  const hideBusinessForm = () => {
    setState(false)
  } 

  return (
    <div className="container">              
      {errors ? 
        <div className="alert alert-warning alert-dismissible fade show mt-3" role="alert">
          {errors.data.message}
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div> : ""
      }  
      <div className="card shadow p-3 my-2 bg-white rounded">
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
            <div className="row">
              {business.map((item, index) => {
                  return (                        
                  <div className="col-sm-6 mt-4" key={index}> 
                    <div className="card shadow bg-white rounded">
                      <div className="card-body">                  
                        <h6 className="card-title">Business Name : {item.name}</h6>                 
                        <p className="card-text">Business Description : {item.description}</p> 
                        <p className="card-text">Business logo link :
                          <Link to={item.logoUrl}> {item.logoUrl}</Link>                            
                        </p>  
                        <p className="card-text">Business CAC document link :
                          <Link to={item.cacDocumentUrl}> {item.cacDocumentUrl}</Link>
                        </p>
                        <a href="/" id={item.id} onClick={getWallets} className="btn btn-success">Wallets</a>
                        <a href="/" id={item.id} onClick={analytics} className="btn btn-success ml-4">Business Report</a>
                      </div>
                    </div>
                  </div>                    
                  );
              })}
            </div>
            <button onClick={displayBusinessForm } className="btn btn-outline-secondary mt-4">Register a business</button>
        </div>
      </div>
      { state ? <BusinessForm hideBusinessForm={hideBusinessForm} /> : false }
      
    </div>
  )
}

export default Dashboard;
