import React, { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import { authContext } from "../../auth-context/authProvider";
import BusinessForm from "./BusinessForm";
import { boardAlgorithm } from "../Algorithm/boardAlgorithm";

function Dashboard() {
  const history = useHistory()

  if (!localStorage['auth']) {
    history.push("/");
  }
  const { business, dispatch, isAuthenticated, getAllWallets, getAnalytics, getAllBusiness, errors, deleteBusiness } = useContext(authContext);     
  
  useEffect(() => {
    if(isAuthenticated){ 
      getAllBusiness();           
    }
  },[isAuthenticated])

  const [state, setState] = useState(false)

  const displayBusinessForm = () => {    
    setState(true)
  }

  const hideBusinessForm = () => {
    setState(false)
    getAllBusiness()
  }

  const getWallets = (e) => {
    e.preventDefault();   
    localStorage.setItem(
      "currentBusinessId",
      JSON.stringify(e.target.id)
    );
    getAllWallets(history, e.target.id);  
  };

  const analytics = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "currentBusinessId",
      JSON.stringify(e.target.id)
    );
    getAnalytics(history, e.target.id);  
  };

  const onDeleteClick = e => {
    deleteBusiness(e.target.id);
  };

  let boardContent;

  boardContent = boardAlgorithm(business, analytics, getWallets, onDeleteClick)

  return (
    <div className="container">         
      <button onClick={displayBusinessForm } className="btn btn-outline-info my-4">Register a business</button>
      {errors.msg ? 
        <div className="alert alert-warning alert-dismissible fade show mt-3" role="alert">
          {errors.msg}
          <button type="button" className="close" data-dismiss="alert" aria-label="Close"  onClick={()=>dispatch({type:"REMOVE_ERROR"})}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div> : ""
      } 

      {boardContent} 
      
      { state ? <BusinessForm hideBusinessForm={hideBusinessForm} /> : false }
      
    </div>
  )
}

export default Dashboard;
