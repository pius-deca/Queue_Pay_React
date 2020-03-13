import React, {useContext, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import { authContext } from "../../auth-context/authProvider";

function Analytics(){
    let history = useHistory();

    if (!localStorage['auth']) {
      history.push("/");
    }

    const {getAnalytics, analytics} = useContext(authContext);

    useEffect(() => {
      const businessId = localStorage['currentBusinessId'] ? JSON.parse(localStorage['currentBusinessId']) : "" 
      getAnalytics(history, businessId);    
    }, [])
    
    return (
      <div className="container">          
        
        <div className="analytics mt-4">         
          <div className="card shadow bg-white rounded">
            <div className="card-body">                         
              <p className="card-text">Business Value : {analytics.value}</p>                 
              <p className="card-text">Total Successfull Business Transactions : {analytics.successfulTransaction}</p>                 
              <p className="card-text">Total Business Account Balance : {analytics.accountBalance}</p>                                     
              <div className="row">{analytics && analytics.wallet.map((item, index) => {
                return(
                  <div className="col-sm-4 mt-2" key={index}>                  
                    <div className="card shadow bg-white rounded p-4">
                      <p className="card-text">Wallet Type : {item.walletType}</p>
                      <p className="card-text"> Wallet Balance : {item.balance}</p>
                    </div> 
                  </div>
                )                
              })}</div>
            </div>
          </div>
        </div>     
      </div>  
    )
}

export default Analytics
