import React, {useContext, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { authContext } from "../../auth-context/authProvider";


function Cashout() {
  let history = useHistory();

  const {getAllWallets} = useContext(authContext);

  useEffect(() => {
    const currentId = localStorage['currentId'] ? JSON.parse(localStorage['currentId']) : ""
    getAllWallets(history, currentId);
  }, [])
  
  if (!localStorage['auth']) {
    history.push("/");
  }
  
  const { wallets } = useContext(authContext);

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
                            <button className="btn btn-outline-secondary">Cash out</button>
                        </div>
                    </div>
                </div>                    
                );
            })}
            </div>
        </div>        
        <div className="card-body">
            <form className="form">
                <div className="form-group">
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Amount To Cash Out"
                    name="amout"
                    required
                    />
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Bank Name"
                    name="bankName"
                    required
                    />
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Bank Account Number"
                    name="bankAccountNumber"
                    required
                    />
                </div>
                <div className="form-group">
                    <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Pin Number"
                    name="pin"
                    required
                    />
                </div>
                <div className="form-group">
                    <input
                    type="submit"
                    value="Cash Out"
                    className="btn btn-lg btn-block btn-outline-success mt-4"
                    />
                </div>
            </form>
        </div>
    </div>
  );
}

export default Cashout;
