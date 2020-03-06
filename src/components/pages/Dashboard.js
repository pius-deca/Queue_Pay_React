import React, { useContext } from "react";
import { Link } from 'react-router-dom'
import DashboardHeader from "./Layout/DashboardHeader";
import { authContext } from "../../auth-context/authProvider";

function Dashboard() {

  const { business} = useContext(
    authContext
  );
  const {fullName, email, phoneNumber} = localStorage

  return (
    <div>
      <DashboardHeader />
      <div className="card container shadow p-3 mt-5 bg-white rounded">
        <div className="card-body">
            <div className="">
              <h5>
                <span>Merchant Name : </span>
                {fullName}
              </h5>
            </div>
            <div className="">
              <h5>
                <span>Merchant Email : </span>
                {email}
              </h5>
            </div>
            <div className="">
              <h5>
                <span>Merchant Phone Number : </span>
                {phoneNumber}
              </h5>
            </div>
            <div className="">
              <h5>Merchant Businesses                
              </h5>
                {business.map((item, index) => {
                    return (                        
                    <ul className="mt-3">                    
                        <li key={index}>{item.name}</li>                 
                        <li key={index}>{item.description}</li> 
                        <li key={index}>
                            <Link to={item.logoUrl}>{item.logoUrl}</Link>
                        </li>                  
                    </ul>                    
                    );
                })}
            </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
