import React, {useContext, useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import { authContext } from "../../auth-context/authProvider";
import CashoutForm from "./CashoutForm";


function Cashout() {
  let history = useHistory();

  const {getAllWallets, wallets} = useContext(authContext);

  useEffect(() => {
    const businessId = localStorage['currentBusinessId'] ? JSON.parse(localStorage['currentBusinessId']) : ""
    getAllWallets(history, businessId);
  }, [])
  
  if (!localStorage['auth']) {
    history.push("/");
  }

  const [state, setState] = useState(false)

  const displayForm = (e) => {    
    setState(true)    
    localStorage.setItem('currentWalletId', JSON.stringify(e.target.id));
  }

  const hideForm = () => {
    setState(false)
  }    

  return (
    <div className="card container shadow p-3 mb-5 bg-white rounded">
        <div className="wallets">
            <div className="row">
            {wallets.map((item, index) => {                      
                return (                      
                <div className="col-sm-6 mt-2" key={index}> 
                    <div className="card shadow bg-white rounded">
                        <div className="card-body">                  
                            <h6 className="card-title">Business Name : {item.business.name}</h6>                 
                            <p className="card-text">Balance : {item.balance}</p>                 
                            <p className="card-text">Wallet Type : {item.walletType}</p>                        
                            <button onClick={displayForm} id={item.id} className="btn btn-outline-secondary">Cash out</button>
                        </div>
                    </div>
                </div>                    
                );
            })}
            </div>
        </div>
        {state ? <CashoutForm hideForm={hideForm}/> : false}     
    </div>    
  );
}

export default Cashout;
