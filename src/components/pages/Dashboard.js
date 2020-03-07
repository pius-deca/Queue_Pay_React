import React, { useContext,useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom'
import { authContext } from "../../auth-context/authProvider";

function Dashboard() {
  const [auth, setAuth] = useState({})
  const history = useHistory()
  if (!localStorage['auth']) {
    history.push("/");
  }
  const { business, isAuthenticated } = useContext(
    authContext
    ); 
  useEffect(() => {
    if(isAuthenticated){
      const json = localStorage['auth']?JSON.parse(localStorage['auth']):{}
      setAuth({...json})
    }
  },[isAuthenticated, business])

  return (
      <div className="card container shadow p-3 mt-5 bg-white rounded">
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
                    </ul>                    
                    );
                })}
            </div>
        </div>
      </div>
  )
}

export default Dashboard;
